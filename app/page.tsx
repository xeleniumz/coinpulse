import DataTable from '@/components/DataTable'
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { DataTableColumn, TrendingCoin } from '@/type';

// Dummy data matching TrendingCoin type
const dummyTrendingCoins: TrendingCoin[] = [
  {
    item: {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      market_cap_rank: 1,
      thumb: '/assets/logo.svg',
      large: '/assets/logo.svg',
      data: {
        price: 89000.50,
        price_change_percentage_24h: {
          usd: 2.45
        }
      }
    }
  },
  {
    item: {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      market_cap_rank: 2,
      thumb: '/assets/converter.svg',
      large: '/assets/converter.svg',
      data: {
        price: 3250.75,
        price_change_percentage_24h: {
          usd: -1.23
        }
      }
    }
  },
  {
    item: {
      id: 'binancecoin',
      name: 'BNB',
      symbol: 'BNB',
      market_cap_rank: 4,
      thumb: '/assets/logo.svg',
      large: '/assets/logo.svg',
      data: {
        price: 585.20,
        price_change_percentage_24h: {
          usd: 0.85
        }
      }
    }
  },
  {
    item: {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      market_cap_rank: 5,
      thumb: '/assets/converter.svg',
      large: '/assets/converter.svg',
      data: {
        price: 142.30,
        price_change_percentage_24h: {
          usd: 5.67
        }
      }
    }
  },
  {
    item: {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      market_cap_rank: 8,
      thumb: '/assets/logo.svg',
      large: '/assets/logo.svg',
      data: {
        price: 0.52,
        price_change_percentage_24h: {
          usd: -2.15
        }
      }
    }
  }
];

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: 'Name',
    cellClassName: 'name-cell' ,
    cell: (coin) => {
      const { item } = coin;
      return (
        <Link
          href={`/coin/${item.id}`}
          className='flex items-center gap-2'
        >
          <Image src={item.large} alt={item.name} width={36} height={36} />
          <p>{item.name}</p>
          
        </Link>
      )
    }
  },
  {
    header: '24h Change',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const { item } = coin;
      const change = item.data.price_change_percentage_24h.usd;
      const isTrendingUp = change > 0;
      return (
        <div className={cn('price-change flex items-center gap-1', isTrendingUp ?
          'text-green-500' : 'text-red-500'
        )}>
          {isTrendingUp 
            ? (<TrendingUp width={16} height={16} />)
            : (<TrendingDown width={16} height={16} />)
          }
          <span>{change.toFixed(2)}%</span>
        </div>
      )
    }
  },
  {
    header: 'Price',
    cellClassName: 'price-cell',
    cell: (coin) => `$${coin.item.data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
]

const page = () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <div className='coin-overview'>
          <div className='header'>
            <Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" alt="Bitcoin Logo" width={56} height={56} />
            <div className='info'>
              <p>Bitcoin / BTC</p>
              <p>$89,000.00</p>
            </div>
          </div>
        </div>
        <p>Trending Coins</p>
        <DataTable
          columns={columns}
          data={dummyTrendingCoins}
          rowKey={(coin: TrendingCoin) => coin.item.id}
        />
      </section>
      <section className='w-full mt-7 space-y-7'>
        <pre>Categories</pre>
      </section>

    </main>
  )
}

export default page