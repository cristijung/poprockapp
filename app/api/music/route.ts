
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const s = searchParams.get('s') || 'rock';
  
  try {
    const res = await fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${s}`);
    const data = await res.json();
    return NextResponse.json(data);
    // eslint-disable-next-line
  } catch (_error) { 
    return NextResponse.json({ error: "Falha na API" }, { status: 500 });
  }
}