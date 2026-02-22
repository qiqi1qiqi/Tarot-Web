export async function onRequestPost(context) {
  const { request, env } = context;

  // 1. 获取前端传来的参数
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

  const cardDetails = cards.map(c => 
    `${cardNames[c.no] || '未知卡牌'}(${c.isReversed ? '逆位' : '正位'})`
  ).join('、');

  // --- 配置区域 ---
  // 优先级：Cloudflare 环境变量 > 硬编码默认值
  const baseUrl = env.LLM_BASE_URL || "https://api.deepseek.com/v1"; 
  const apiKey = env.LLM_API_KEY || "sk-L8W2WtnCtdwG6nctF975D0E770144dE5Be3123Fa16720a03";
  // ----------------

  const body = {
    "messages": [
      {
        "role": "system",
        "content": "你是一位专业的塔罗占卜师。请根据用户的问题和抽到的牌进行深度解析，包含牌面解析、综合建议和成败概率。使用 Markdown 格式。"
      },
      {
        "role": "user",
        "content": `问题：'${question}'。牌阵：${cardDetails}。`
      }
    ],
    "model": "deepseek-chat",
    "temperature": 0.7,
    "stream": false
  };

  try {
    // 3. 使用拼接后的 URL 发起请求
    // 注意：这里使用了模板字符串将 baseUrl 和具体接口路径 (/chat/completions) 结合
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errorDetail = await res.text();
      return new Response(`AI 接口异常: ${res.status} - ${errorDetail}`, { status: 500 });
    }

    const data = await res.json();
    const result = data.choices[0].message.content;

    return new Response(result);

  } catch (error) {
    return new Response(`解析出错: ${error.message}`, { status: 500 });
  }
}
