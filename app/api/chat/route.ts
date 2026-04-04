import { NextResponse } from 'next/server';
import { Pinecone } from "@pinecone-database/pinecone";
import { CohereEmbeddings } from "@langchain/cohere";
import { PineconeStore } from "@langchain/pinecone";

const GREETING_WORDS = ["merhaba", "selam", "hey", "naber", "nasılsın", "hello", "hi", "sa", "selamun"];

function isGreeting(text: string): boolean {
  const normalized = text.trim().toLowerCase().replace(/[!?.,]/g, "");
  return normalized.split(/\s+/).length <= 3 && GREETING_WORDS.some(w => normalized.includes(w));
}

const SYSTEM_PROMPT = `Sen "Sami AI" adında, Sami Güvenç'in portfolyo sitesindeki profesyonel asistansın.

KİMLİĞİN:
- Sami Güvenç hakkında bilgi veren, samimi ama profesyonel bir asistansın.
- Sami'den bahsederken 3. tekil şahıs kullan (Sami, kendisi, o).
- Kısa ve öz cevaplar ver. Gereksiz tekrar yapma.

DAVRANIŞ KURALLARI:
1. Selamlaşma (merhaba, selam, hey vb.): Kısa ve sıcak karşıla. Örnek: "Merhaba! Ben Sami'nin AI asistanıyım. Sami'nin projeleri, eğitimi veya yetkinlikleri hakkında sorularınızı yanıtlayabilirim. Size nasıl yardımcı olabilirim?" Context bilgilerini selamlaşmada KULLANMA.
2. Sami hakkında soru sorulursa: SADECE sana sağlanan bilgi kaynağını (context) kullan. Bilgiyi uydurma.
3. Context'te olmayan bilgi sorulursa: "Bu konuda detaylı bilgim yok, ancak Sami ile doğrudan iletişime geçebilirsiniz." de.
4. Konu dışı sorular (hava durumu, genel bilgi, siyaset vb.): "Ben sadece Sami Güvenç hakkında bilgi verebilen bir asistanım. Sami'nin projeleri, eğitimi veya deneyimleri hakkında soru sorabilirsiniz." de.
5. Aynı bilgiyi tekrar tekrar söyleme, önceki mesajlara dikkat et.
6. Cevapların 2-3 cümleyi geçmesin (detaylı soru sorulmadıkça).
7. Projeleri anlatırken teknik detaylara vurgu yap.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    let context = "";

    // Selamlaşma değilse RAG sorgusu yap
    if (!isGreeting(lastMessage)) {
      const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
      const index = pc.index("portfolio-index");

      const embeddings = new CohereEmbeddings({
        apiKey: process.env.COHERE_API_KEY,
        model: "embed-multilingual-v3.0",
      });

      const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex: index,
        textKey: "text",
      });

      const relevantDocs = await vectorStore.similaritySearch(lastMessage, 3);
      context = relevantDocs.map(doc => doc.pageContent).join("\n\n");
    }

    // Sohbet geçmişini hazırla (son 10 mesaj)
    const recentMessages = messages.slice(-10);
    const chatHistory = recentMessages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "ai" ? "assistant" : msg.role,
      content: msg.content,
    }));

    // System prompt'u context ile birleştir
    const systemContent = context
      ? `${SYSTEM_PROMPT}\n\nBİLGİ KAYNAĞI (CONTEXT):\n${context}`
      : SYSTEM_PROMPT;

    const response = await fetch("https://api.sambanova.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SAMBANOVA_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "Meta-Llama-3.3-70B-Instruct",
        messages: [
          { role: "system", content: systemContent },
          ...chatHistory,
        ],
        temperature: 0.3,
        max_tokens: 300,
        stream: false,
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return NextResponse.json({ role: 'ai', content: data.choices[0].message.content });
    } else {
      throw new Error("SambaNova boş yanıt döndürdü");
    }

  } catch (error) {
    console.error("Chat Hatası:", error);
    return NextResponse.json({ error: "Asistan şu an cevap veremiyor." }, { status: 500 });
  }
}