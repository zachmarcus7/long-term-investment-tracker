export async function POST(req: { message: string, source: string, lineno: string, colno: string }) {
  try {
    console.log(req);
    return new Response('', {status: 200});
  } catch (error) {
    console.log('Error fetching stock symbols:', error);
    return new Response('Failed to fetch stock symbols', { status: 500 });
  }
}