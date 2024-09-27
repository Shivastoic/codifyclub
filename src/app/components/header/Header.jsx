'use client'

// IMPORT NEXT COMPONENTS
import Image from "next/image"
import Link from "next/link"
import { DesktopNavbar } from "./navbar/DesktopNavbar"

const Header  = () => {

    return (

        <header className="fixed top-0 left-0 w-full flex justify-between px-6 py-4">
            <Link href="/" className="max-w-60 lg:w-full">
                <Image
                    src="/logos/codify-white.png" 
                    alt="Description"
                    width={100}
                    height={50}
                    className="lg:w-32 w-28"
                />
            </Link>
            <DesktopNavbar />
            <div className="hidden max-w-60 lg:w-full lg:flex justify-end items-center gap-4">
                <Link href="/signup">
                    <button className="border-2 border-white rounded-full px-6 py-2 text-white">Sign up</button>
                </Link>
                <Link href="/signin">
                    <button className="border-2 border-white bg-white rounded-full px-6 py-2">Sign in</button>
                </Link>
            </div>
        </header>

    )

}
export default Header
