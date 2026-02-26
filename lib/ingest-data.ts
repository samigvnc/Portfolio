import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from "@pinecone-database/pinecone";
import { CohereEmbeddings } from "@langchain/cohere";
import { Document } from "@langchain/core/documents";
import fs from "fs/promises";
import path from "path";

export const ingestPDFs = async () => {
  try {
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
    const index = pc.index("portfolio-index");

    const docsDir = path.join(process.cwd(), "public", "docs");
    const files = await fs.readdir(docsDir);
    const txtFiles = files.filter(file => file.endsWith(".txt"));

    let allDocs: Document[] = [];

    for (const fileName of txtFiles) {
      const filePath = path.join(docsDir, fileName);
      const text = await fs.readFile(filePath, "utf-8");
      if (text.trim().length > 0) {
        allDocs.push(new Document({ pageContent: text, metadata: { source: fileName } }));
      }
    }

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });
    
    const splitDocs = await textSplitter.splitDocuments(allDocs);
    console.log(`Vektörleştirilecek toplam parça: ${splitDocs.length}`);

    const embeddings = new CohereEmbeddings({ 
      apiKey: process.env.COHERE_API_KEY,
      model: "embed-multilingual-v3.0" 
    });

    // MANUEL YÜKLEME: Her bir parçayı vektöre çevirip Pinecone'a basıyoruz
    const vectors = [];
    for (let i = 0; i < splitDocs.length; i++) {
      const doc = splitDocs[i];
      const [embedding] = await embeddings.embedDocuments([doc.pageContent]);
      
      vectors.push({
        id: `chunk-${i}`,
        values: embedding,
        metadata: {
          text: doc.pageContent,
          source: doc.metadata.source
        }
      });
    }

    if (vectors.length > 0) {
      await index.upsert({ records: vectors });
      console.log("Sami'nin tüm verileri başarıyla Pinecone'a aktarıldı! ✅");
    } else {
      throw new Error("Vektör oluşturulamadı.");
    }

  } catch (error) {
    console.error("Ingest Hatası:", error);
    throw error;
  }
};