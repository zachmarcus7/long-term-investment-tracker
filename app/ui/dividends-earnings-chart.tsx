export default function DividendsEarningsChart({
  data,
  shareOutstanding
}: {
  data: any;
  shareOutstanding: number;
}) {

  // Step 1: Calculate Net Income
  var netIncome = data.metric.epsAnnual * shareOutstanding;

  console.log(netIncome);

  // Step 2: Calculate Dividends Paid
  var dividendsPaid = data.metric.dividendPerShareAnnual * shareOutstanding;

  console.log(dividendsPaid);

  // Step 3: Calculate Earnings Retained
  var earningsRetained = netIncome - dividendsPaid;

  console.log(earningsRetained);

  return (
    <>
      <p>dividends paid: {dividendsPaid}</p>
      <p>earnings retained: {earningsRetained}</p>
    </>
  );
}