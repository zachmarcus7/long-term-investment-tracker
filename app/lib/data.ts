import { Revenue } from '@/app/lib/definitions';

export async function fetchRevenue() {
  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log('Data fetch completed after 3 seconds.');
    return ([
      {month: "April", revenue: 5}, 
      {month: "May", revenue: 3}, 
      {month: "June", revenue: 6},
      {month: "June", revenue: 6},
      {month: "June", revenue: 6},
      {month: "June", revenue: 6},
      {month: "June", revenue: 6},
      {month: "June", revenue: 6},
      {month: "June", revenue: 6},
      {month: "June", revenue: 6},
      {month: "June", revenue: 6},
      {month: "June", revenue: 6}
    ]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}