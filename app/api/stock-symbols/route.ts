import { getStockSymbols } from '@/app/lib/finn-hub-service';

export async function GET() {
  try {
    const res = await getStockSymbols();
    return Response.json(res);
  } catch (error) {
    console.log('Error fetching stock symbols:', error);
    return new Response('Failed to fetch stock symbols', { status: 500 });
  }
}