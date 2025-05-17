import { NextRequest } from "next/server";

export async function POST(req: Request | NextRequest) {
  try {
    const data = await req.json();

    console.log('Client error reported:', data);

    return new Response('', { status: 200 });
  } catch (error) {
    console.log('Error handling client error report:', error);
    return new Response('Failed to process client error', { status: 500 });
  }
}
