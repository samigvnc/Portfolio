import { NextResponse } from 'next/server';
import { Pinecone } from "@pinecone-database/pinecone";
import { CohereEmbeddings } from "@langchain/cohere";
import { PineconeStore } from "@langchain/pinecone";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // 1. Pinecone ve Cohere Bağlantısını Hazırla
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
    const index = pc.index("portfolio-index");

    const embeddings = new CohereEmbeddings({
      apiKey: process.env.COHERE_API_KEY,
      model: "embed-multilingual-v3.0",
    });

    // 2. Vektör Veritabanında Arama Yap (Similarity Search)
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      textKey: "text",
    });

    // Kullanıcının sorusuyla en ilgili 3 metin parçasını getir
    const relevantDocs = await vectorStore.similaritySearch(lastMessage, 3);
    
    // Bulunan dökümanları tek bir metin bloğu haline getir
    const context = relevantDocs.map(doc => doc.pageContent).join("\n\n");

    // 3. SambaNova'ya Context ile Birlikte Gönder
    const response = await fetch("https://api.sambanova.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SAMBANOVA_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "Meta-Llama-3.3-70B-Instruct",
        messages: [
          { 
            role: "system", 
            content: `Sen Sami Güvenç'in profesyonel asistanısın. 
            Sana sağlanan gerçek dökümanlara dayanarak Sami hakkında bilgi ver. 
            Cevaplarını samimi ama profesyonel bir dille yaz. 
            Eğer bilgi dökümanlarda yoksa 'Bu konuda detaylı bilgim yok' de.
            
            BİLGİ KAYNAĞI (CONTEXT):
            ${context}` 
          },
          { role: "user", content: lastMessage }
        ],
        stream: false
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