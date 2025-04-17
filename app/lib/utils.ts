import { Revenue } from '@/app/lib/definitions';

/**
 * 
 * @param data 
 * @returns 
 */
export function calculateMonthlyROI(data: any[]) {
  const roiData = [];

  for (let i = 1; i < data.length; i++) {
    const prevClose = data[i - 1].c;
    const currentClose = data[i].c;
    const roi = ((currentClose - prevClose) / prevClose) * 100;

    roiData.push({
      label: new Date(data[i].t).toLocaleString('default', { month: 'short' }),
      roi: parseFloat(roi.toFixed(2))
    });
  }

  return roiData;
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