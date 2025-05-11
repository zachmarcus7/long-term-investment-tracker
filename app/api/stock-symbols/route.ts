import { getStockSymbols } from '@/app/lib/finn-hub-service';

export async function GET() {
  try {
    const res = await getStockSymbols();
    return Response.json(res);
  } catch { }
}