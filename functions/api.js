export async function onRequestPost(context) {
  const { request, env } = context;

  // 1. 获取前端传来的参数 (匹配上一轮 Home.vue 的数据结构)
  const { question, cards } = await request.json();

  // 2. 塔罗牌名称映射表
  const cardNames = {
    "0": "愚者", "1": "魔术师", "2": "女祭司", "3": "皇后", 
    "4": "皇帝", "5": "教皇", "6": "恋人", "7": "战车", 
    "8": "力量", "9": "隐士", "10": "命运之轮", "11": "正义", 
    "12": "倒吊人", "13": "死神", "14": "节制", "15": "恶魔", 
    "16": "塔", "17": "星星", "18": "月亮", "19": "太阳", 
    "20": "审判", "21": "世界"
  };

  // 格式化卡牌信息供 AI 理解
  const cardDetails = cards.map(c => 
    `${cardNames[c.no] || '未知卡牌'}(${c.isReversed ? '逆位' : '正位'})`
  ).join('、');

  // 3. 构建请求体
  const body = {
    "messages": [
      {
        "role": "system",
        "content": "你是一位拥有20年经验的塔罗占卜师，精通神秘学与心理学。请根据用户的问题和抽到的牌阵进行深度解析。你的回答应包含：1.牌面解析（结合正逆位意象）；2.综合建议；3.最后给出一个百分比代表事情的成败几率或能量强度。语气要温暖、睿智且富有启发性，使用 Markdown 格式。"
      },
      {
        "role": "user",
        "content": `我的问题是：'${question}'。我抽到的三张牌是：${cardDetails}。请帮我详细占卜。`
      }
    ],
    "model": "glm-4-flash", // 你可以根据需要改为 deepseek-chat 或其他
    "temperature": 0.7,
    "stream": false
  };

  try {
    // 4. 发起 API 请求
    // 注意：env.API_KEY 是你在 Cloudflare 后台设置的环境变量。
    // 如果你还没设置，可以暂时先换回你原来的 sk-... 字符串，但生产环境建议用 env 变量。
    const apiKey = env.LLM_API_KEY || "sk-L8W2WtnCtdwG6nctF975D0E770144dE5Be3123Fa16720a03"; 
    
    const res = await fetch("https://nas-ai.4ce.cn/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      return new Response("AI 占卜师暂时无法感应，请稍后再试。", { status: 500 });
    }

    const data = await res.json();
    const result = data.choices[0].message.content;

    // 返回纯文本给前端解析
    return new Response(result);

  } catch (error) {
    return new Response(`解析出错: ${error.message}`, { status: 500 });
  }
}
