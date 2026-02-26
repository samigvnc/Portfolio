import { NextResponse } from "next/server";
import { ingestPDFs } from "@/lib/ingest-data";

export async function GET() {
  try {
    await ingestPDFs();
    return NextResponse.json({ message: "Veriler başarıyla yüklendi" });
  } catch (error) {
    return NextResponse.json({ error: "Yükleme başarısız" }, { status: 500 });
  }
}