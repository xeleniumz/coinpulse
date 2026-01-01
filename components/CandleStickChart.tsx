import { CandlestickChartProps } from "@/type";

const CandleStickChart = ({
  children,
  data,
  coinId,
  height = 300,
  initialPeriod = "daily",
}: CandlestickChartProps) => {
  return (
    <div id="candle-stick-chart">
      <div className="chart-header">
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default CandleStickChart;
