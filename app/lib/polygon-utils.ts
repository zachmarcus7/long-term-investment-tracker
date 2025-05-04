import { DailyData, MonthlyData, Revenue, RoiData } from '@/app/lib/definitions';

/**
 * 
 * @param dailyData 
 * @returns 
 */
export function aggregateToMonthly(dailyData?: DailyData[]): MonthlyData[] {
  if (dailyData === undefined)
    return [];

  const grouped: Record<string, DailyData[]> = {};

  for (const day of dailyData) {
    const date = new Date(day.t);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;

    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(day);
  }

  const result: MonthlyData[] = [];

  for (const [month, days] of Object.entries(grouped)) {
    days.sort((a, b) => a.t - b.t);
    const open = days[0].o;
    const close = days[days.length - 1].c;
    const high = Math.max(...days.map(d => d.h));
    const low = Math.min(...days.map(d => d.l));
    const volume = days.reduce((sum, d) => sum + d.v, 0);

    result.push({ month, o: open, h: high, l: low, c: close, v: volume });
  }

  // Sort months chronologically
  return result.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
}

/**
 * 
 * @param data 
 * @returns 
 */
export function calculateMonthlyROI(data: MonthlyData[]) {
  const roiData = [];

  for (let i = 1; i < data.length; i++) {
    const prevClose = data[i - 1].c;
    const currentClose = data[i].c;
    const roi = ((currentClose - prevClose) / prevClose) * 100;

    roiData.push({
      label: new Date(data[i].month).toLocaleString('default', { month: 'short', year: 'numeric' }),
      roi: parseFloat(roi.toFixed(2))
    });
  }

  return roiData;
}

/**
 * 
 * @param data 
 * @returns 
 */
export function calculateAverageMonthlyROI(data: RoiData[]) {
  if (data.length === 0) 
    return 0;
  
  const total = data.reduce((sum, item) => sum + item.roi, 0);
  return parseFloat((total / data.length).toFixed(2));
}

/**
 * 
 * @param revenue 
 * @returns 
 */
export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

/**
 * 
 * @param data 
 * @returns 
 */
export function getYearlyChange(data?: DailyData[]): number {
  if (data === undefined)
    return 0;

  if (data.length === 0 || data.length === 1) 
    return 0;
  
  return Number((data[data.length - 1].c - data[0].c).toFixed(2));
}

/**
 * 
 * @param data 
 * @returns 
 */
export function getPercentChange(data?: DailyData[]): number {
  if (data === undefined)
    return 0;

  if (data.length === 0 || data.length === 1) 
    return 0;
  
  return Number((((data[data.length - 1].c - data[0].c)/data[0].c) * 100).toFixed(2));
}