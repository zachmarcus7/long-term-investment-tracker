export type DailyData = {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
};

export type DailyDataResponse = {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: DailyData[];
  status: string;
  request_id: string;
  count: number;
};

export type MonthlyData = {
  month: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type RoiData = {
  label: string;
  roi: number;
};

export type StockDataPoint = {
  t: number;
  c: number;
};

export type StockSymbol = {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  isin?: string;
  mic: string;
  shareClassFIGI: string;
  symbol: string;
  symbol2: string;
  type: string;
}

export type RecommendationData = {
  buy: number;
  hold: number;
  period: string;
  sell: number;
  strongBuy: number;
  strongSell: number;
  symbol: string;
}