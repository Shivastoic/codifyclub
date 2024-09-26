// IMPORT NEXT COMPONENTS
import Image from "next/image"
import Link from "next/link"

const Header  = () => {

    return (

        <header className="fixed top-0 left-0 w-full flex justify-between px-6 py-2 border-b-2 border-black">
            <Link href="/">
                <Image
                    src="/logos/codify-white.png" 
                    alt="Description"
                    width={140}
                    height={60}
                    className="xl:w-32 w-28"
                />
            </Link>
            <nav className="flex gap-4 items-center">
                <Link href="/" className="text-white">Home</Link>
                <Link href="/founders" className="text-white">Founders</Link>
                <Link href="/founders" className="text-white">Founders</Link>
                <Link href="/founders" className="text-white">Founders</Link>
                <Link href="/founders" className="text-white">Founders</Link>
            </nav>
        </header>

    )

}
export default Header
