const Product = require("../../models/product.model");

const getChatResponse = async (messages) => {
  // Barcha faol mahsulotlarni o'qiymiz
  const products = await Product.find({ isActive: true }).populate("category", "name");

  // Mahsulotlarni chiroyli formatda matnga aylantiramiz
  const productLines = products.map(p => {
    const categoryName = p.category ? p.category.name : "Nomalum";
    const sizesStr = p.sizes ? p.sizes.map(s => s.size).join(", ") : "";
    const colorsStr = p.colors ? p.colors.map(c => c.name).join(", ") : "";
    const priceText = p.discountPrice 
      ? `${p.discountPrice.toLocaleString()} so'm (Chegirma! Asl narxi: ${p.price.toLocaleString()} so'm)`
      : `${p.price.toLocaleString()} so'm`;
    return `- ${p.name} (Brend: ${p.brand}, Kategoriya: ${categoryName}, Jins: ${p.gender}, Mavsum: ${p.season}, Narx: ${priceText}, O'lchamlar: [${sizesStr}], Ranglar: [${colorsStr}])`;
  }).join("\n");

  const systemPrompt = `Siz "Fashion Store" do'konining aqlli, xushmuomala va yordamga tayyor virtual maslahatchisisiz (chatbot).
Mijozlarga kiyim tanlashda yordam berasiz, mahsulotlarimiz, narxlar va chegirmalar haqida ma'lumot berasiz.

Tizimda mavjud bo'lgan REAL mahsulotlar ro'yxati:
${productLines}

Qoidalar:
1. Muloqotni mijoz yozgan tilda olib boring (odatda o'zbekcha yozishsa o'zbekcha, ruscha bo'lsa ruscha).
2. Tizimda mavjud bo'lmagan mahsulotlar so'ralsa, bizda hozircha yo'qligini, ammo boshqa o'xshash yoki mos variantlar borligini aytib, ularni taklif qiling.
3. Chegirmali mahsulotlarni (Chegirma! deb yozilganlarni) ko'proq tavsiya qilishga harakat qiling.
4. Do'konning yetkazib berish va qaytarish qoidalari haqida so'rashsa:
   - Yetkazib berish: O'zbekiston bo'ylab 1-3 kunda yetkazib beriladi (100,000 so'mdan oshsa bepul).
   - Qaytarish/Almashtirish: Agar o'lchami to'g'ri kelmasa yoki yoqmasa, 14 kun ichida bepul almashtirib yoki qaytarib beriladi.
5. Javoblaringiz samimiy, chiroyli (emojilar bilan bezatilgan), aniq va qisqa bo'lsin.
`;

  // Groq so'rovini tayyorlaymiz
  const groqMessages = [
    { role: "system", content: systemPrompt },
    ...messages
  ];

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY .env faylida topilmadi! Iltimos, Groq API kalitini o'rnating.");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: groqMessages,
      temperature: 0.7,
      max_tokens: 1024
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq API xatosi: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

module.exports = { getChatResponse };
