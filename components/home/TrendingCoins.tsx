import { fetcher } from "@/lib/coingecko.actions";
import { cn } from "@/lib/utils";
import { DataTableColumn, TrendingCoin } from "@/type";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DataTable from "../DataTable";
import { TrendingCoinsFallback } from "./fallback";

const TrendingCoins = async () => {
  let trendingCoins: { coins: TrendingCoin[] };
  try {
    trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
      "/search/trending",
      undefined,
      300
    );
  } catch (error) {
    console.error(error);
    return <TrendingCoinsFallback />;
  }
  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: (coin) => {
        const { item } = coin;
        return (
          <Link href={`/coin/${item.id}`} className="flex items-center gap-2">
            <Image src={item.large} alt={item.name} width={36} height={36} />
            <p>{item.name}</p>
          </Link>
        );
      },
    },
    {
      header: "24h Change",
      cellClassName: "name-cell",
      cell: (coin) => {
        const { item } = coin;
        const change = item.data.price_change_percentage_24h.usd;
        const isTrendingUp = change > 0;
        return (
          <div
            className={cn(
              "price-change flex items-center gap-1",
              isTrendingUp ? "text-green-500" : "text-red-500"
            )}
          >
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
            <span>{change.toFixed(2)}%</span>
          </div>
        );
      },
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) =>
        `$${coin.item.data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
  ];

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      <div id="trending-coins">
        <DataTable
          columns={columns}
          data={trendingCoins.coins.slice(0, 6) || []}
          rowKey={(coin: TrendingCoin) => coin.item.id}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </div>
    </div>
  );
};

export default TrendingCoins;
