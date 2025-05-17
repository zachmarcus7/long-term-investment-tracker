import { NextRequest } from "next/server";
import { postFinnHubError } from "@/app/lib/finn-hub-service";

export async function POST(req: Request | NextRequest) {
  try {
    postFinnHubError(req);
    return new Response('', {status: 200});
  } catch (error) {
    console.log('Error fetching stock symbols:', error);
    return new Response('Failed to fetch stock symbols', { status: 500 });
  }
}