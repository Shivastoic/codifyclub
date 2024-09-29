'use client'
import styles from './style.module.scss'
import { useEffect, useState } from 'react';
import Nav from './nav';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {

    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();

    useEffect( () => {

      	if(isActive) setIsActive(false)

    }, [pathname])

    return (

		<header>
			<div className="fixed top-0 right-0 flex items-center justify-between w-full z-50 p-4">
				<Link href="/">
					<Image
						className={`lg:w-28 w-24 z-30`}
						src="/logos/codify-white.png"
						width={100}
						height={50}
						alt="logo"
					/>
				</Link>
				<div onClick={() => {setIsActive(!isActive)}} className={`size-12 flex items-center justify-center cursor-pointer rounded-full ${isActive ? "bg-white" : "bg-accent"}`}>
					<div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
				</div>
			</div>
			<AnimatePresence mode="wait">
				{isActive && <Nav />}
			</AnimatePresence>
		</header>

    )

}
