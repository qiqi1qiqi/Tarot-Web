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
        { role: "system", content: "你是一位精通塔罗艺术的神秘学导师。你的解读既要深刻且具有心理学启发，语气要神秘而温柔。" },
        { role: "user", content: `用户的问题是：${prompt}。抽到的牌是：${cardName}（${isUpright ? '正位' : '逆位'}）。请结合牌义给出详细解读。` }
      ],
      stream: false // 初学者建议先关掉流式，方便调试
    }),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data));
};
