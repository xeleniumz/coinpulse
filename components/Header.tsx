'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils';

const Header = () => {
  const pathname = usePathname();
  return (
    <header>
      <div className="main-container inner">
        <Link href="/">
          <Image src="/assets/logo.svg" alt="CoinPulse" width={100} height={100} />
        </Link>
        <nav>
          <Link href="/" className={cn('nav-link', {
            'is-active': pathname === '/',
            'is-home': true,
          })}>
            Home
          </Link>
          <p>Search Modal</p>
          <Link href="/coins" className={cn('nav-link', {
            'is-active': pathname === '/coins',
          })}>
            Coins
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header