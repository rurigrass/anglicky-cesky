import Link from "next/link"

const Header = () => {

    return (
        <header className="flex justify-between px-5 py-2 h-14 bg-duo-gray sticky border-b-black">
            <Link href={"/"} className="flex items-center space-x-5 font-extrabold">
                Anglicky - Cesky
            </Link>
        </header >
    )
}

export default Header