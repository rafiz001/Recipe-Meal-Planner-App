"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import Image from 'next/image'

function nav() {
    const pathname = usePathname();
  return (
    <nav className='flex justify-between px-6 md:px-40 py-2 bg-slate-500 text-white'>
      <Image src="https://placehold.co/50x50@2x.png" width={50} height={50} alt='' className='rounded-xl'/>
      <ul className='flex justify-evenly '>
      <li className='p-3'><Link className={`${pathname === '/search' ? 'text-green-500' : ''}`} href={`/search`}>Search</Link></li>
      <li className='p-3'><Link  href={`/calender`}>Calender</Link></li>
      <li className='p-3'><Link  href={`/cook_mode`}>Cook Mode</Link></li>

    </ul>
    
    </nav>
  )
}

export default nav