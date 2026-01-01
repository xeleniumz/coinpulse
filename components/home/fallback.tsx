import DataTable from "@/components/DataTable";
import { DataTableColumn } from "@/type";
import React from "react";

// Dummy type for skeleton data
type SkeletonRow = {
  id: string;
};

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="header-image skeleton animate-pulse rounded-full" />
        <div className="info">
          <div className="header-line-sm skeleton animate-pulse rounded" />
          <div className="header-line-lg skeleton animate-pulse rounded" />
        </div>
      </div>
      <div className="chart">
        <div className="chart-skeleton animate-pulse rounded-xl" />
      </div>
    </div>
  );
};

export const TrendingCoinsFallback = () => {
  // Create skeleton data for 6 rows
  const skeletonData: SkeletonRow[] = Array.from({ length: 6 }, (_, i) => ({
    id: `skeleton-${i}`,
  }));

  const columns: DataTableColumn<SkeletonRow>[] = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: () => (
        <div className="name-link">
          <div className="name-image skeleton animate-pulse rounded-full" />
          <div className="name-line skeleton animate-pulse rounded" />
        </div>
      ),
    },
    {
      header: "24h Change",
      cellClassName: "name-cell",
      cell: () => (
        <div className="change-cell">
          <div className="price-change">
            <div className="change-icon skeleton animate-pulse rounded-full" />
            <div className="change-line skeleton animate-pulse rounded" />
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: () => (
        <div className="price-line skeleton animate-pulse rounded">$0.00</div>
      ),
    },
  ];

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <div className="trending-coins-table">
        <DataTable
          columns={columns}
          data={skeletonData}
          rowKey={(row: SkeletonRow) => row.id}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </div>
    </div>
  );
};
