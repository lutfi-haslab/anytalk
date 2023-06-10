import { NextRequest, NextResponse } from 'next/server'
 
export async function GET() {
  return NextResponse.json({
    res: "Ini GET"
  })
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const file = formData.get("file") as Blob | null;
  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  return NextResponse.json({
    name: file.name,
    type: file.type,
    size: file.size,
    buffer: buffer
  })
}