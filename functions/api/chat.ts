export const onRequestPost = async (context) => {
  const { env } = context;
  const { prompt, cardName, isUpright } = await context.request.json();

  // 这里以 DeepSeek 或 OpenAI 为例
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.LLM_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "你现在是一位拥有20年经验的塔罗占卜师。请不要只给出死板的定义，而是要像一位老友一样，结合用户当下的困惑，利用[牌名]的象征意象（如色彩、元素、人物动作）来解释现状。如果抽到的是挑战性牌面（如塔、死神），请给出建设性的建议而非单纯的恐惧。" },
        { role: "user", content: `用户的问题是：${prompt}。抽到的牌是：${cardName}（${isUpright ? '正位' : '逆位'}）。请结合牌义给出详细解读。` }
      ],
      stream: false // 初学者建议先关掉流式，方便调试
    }),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data));
};
