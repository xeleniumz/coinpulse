import { fetcher } from "@/lib/coingecko.actions";
import { formatCurrency } from "@/lib/utils";
import { CoinDetailsData, OHLCData } from "@/type";
import Image from "next/image";
import { CoinOverviewFallback } from "./fallback";
import CandleStickChart from "../CandleStickChart";

const CoinOverview = async () => {
  let coin;
  let ohlc;
  try {
    const [coinData, ohlcData] = await Promise.all([
      await fetcher<CoinDetailsData>("/coins/bitcoin", {
        dex_pair_format: "symbol",
      }),
      await fetcher<OHLCData[]>("/coins/bitcoin/ohlc", {
        vs_currency: "usd",
        days: 1,
        precision: "full",
      }),
    ]);
    coin = coinData;
    ohlc = ohlcData;
  } catch (error) {
    console.error(error);
    return <CoinOverviewFallback />;
  }
  return (
    <div id="coin-overview">
      {/* <CandleStickChart /> */}
      <div className="header pt-2">
        <Image
          src={coin.image.large}
          alt="Bitcoin Logo"
          width={56}
          height={56}
        />
        <div className="info">
          <p>
            {coin.name} / {coin.symbol.toUpperCase()}
          </p>
          <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
        </div>
      </div>
    </div>
  );
};

export default CoinOverview;
