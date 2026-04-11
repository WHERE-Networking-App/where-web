'use-client'
import Link from "next/link"
import { Button } from "../ui/button"

export default function HeroSection() {
    return(
        <main className="container mx-auto px-6 text-center pt-32 pb-20">
                <h1 className="text-7xl font-display leading-tight">Meet with Geeks,{' '}
                    <span className="text-purple-400">
                        Near You
                    </span>
                </h1>
                <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto">
                    "WHERE" AI turns random encounters into meaningful relationships. Set your availability, and we'll match you with like-minded tech professionals for coffee, a call, or coworking.
                </p>
                <div className="mt-12">
                    <Button 
                        variant={"default"} 
                        size={"xxl"} 
                        nativeButton={false}
                        render={<Link href="/signup" />}>
                        <span className="text-xl font-bold">
                            Get Started for Free
                        </span>
                    </Button>
                </div>
            </main>
    )
}