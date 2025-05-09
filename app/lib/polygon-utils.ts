import { DailyData, MonthlyData, Revenue, RoiData } from '@/app/lib/definitions';

/**
 * Aggregates daily stock data into monthly data.
 *
 * @param dailyData - Array of daily stock data points.
 * @returns - An array of aggregated monthly data.
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

  // sort months chronologically
  return result.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
}

/**
 * Calculates the month-over-month return on investment (ROI) from monthly data.
 *
 * @param data - Array of monthly data points.
 * @returns - An array of ROI data with month labels.
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
 * Calculates the average of all monthly ROI values.
 *
 * @param data - Array of ROI data points.
 * @returns - The average ROI value rounded to 2 decimals.
 */
export function calculateAverageMonthlyROI(data: RoiData[]) {
  if (data.length === 0) 
    return 0;
  
  const total = data.reduce((sum, item) => sum + item.roi, 0);
  return parseFloat((total / data.length).toFixed(2));
}

/**
 * Generates Y-axis labels for a revenue chart.
 *
 * @param revenue - Array of revenue data points.
 * @returns - An object containing Y-axis labels and the top label value.
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
 * Calculates the raw price change over the provided daily data range.
 *
 * @param data - Array of daily stock data points.
 * @returns - The absolute price difference from first to last day.
 */
export function getYearlyChange(data?: DailyData[]): number {
  if (data === undefined)
    return 0;

  if (data.length === 0 || data.length === 1) 
    return 0;
  
  return Number((data[data.length - 1].c - data[0].c).toFixed(2));
}

/**
 * Calculates the percentage change over the provided daily data range.
 *
 * @param data - Array of daily stock data points.
 * @returns - The percentage price change from first to last day.
 */
export function getPercentChange(data?: DailyData[]): number {
  if (data === undefined)
    return 0;

  if (data.length === 0 || data.length === 1) 
    return 0;
  
  return Number((((data[data.length - 1].c - data[0].c)/data[0].c) * 100).toFixed(2));
}