import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
    return (
        <header className="w-full border-b px-6 py-4">
            <nav className="flex items-center justify-between max-w-7xl mx-auto">
                <Link href="/" className="flex items-center">
                    <img src="/logo.png" alt="WHERE Logo" className="h-10 w-auto" />
                    <div className="relative">
                         <span className="text-2xl font-black text-black dark:text-white">
                        WHERE
                    </span>
                    <span className="absolute -right-6 -top-1 rounded bg-black px-1.5 py-0.5 text-[10px] font-bold text-white dark:bg-white dark:text-black">
                        AI
                    </span>
                    </div>
                   
                </Link>
                <div className="flex items-center space-x-4">
                    <Button 
                        variant={"ghost"} 
                        size={"xl"} 
                        nativeButton={false}
                        render={<Link href="/login" />}>
                        Login
                    </Button>
                    <Button 
                        variant={"default"} 
                        size={"xl"} 
                        nativeButton={false}
                        render={<Link href="/signup" />}>
                        Sign Up
                    </Button>
                </div>
            </nav>
        </header>
    )
}