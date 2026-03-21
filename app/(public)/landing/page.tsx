import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

export default function LandingPage() {
    return (
        <>
            <Header />
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

            <section className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-6xl font-display text-black">Level Up Your Network</h2>
                    <p className="mt-4 text-lg text-gray-600">Networking feels like a game, not a chore.</p>
                    <div className="grid md:grid-cols-3 gap-16 mt-16">
                        {/* Feature 1: Streaks */}
                        <div className="flex flex-col items-center p-8 rounded-2xl border border-purple-800">
                            <div className="bg-purple-500 bg-opacity-50 p-6 rounded-full">
                                <svg className="h-16 w-16 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0117.657 18.657zM9 13h6" /></svg>
                            </div>
                        <h3 className="mt-8 text-3xl font-display text-black">Maintain Your Streak</h3>
                        <p className="mt-4 text-gray-600">Meet new people weekly to build your networking streak and unlock rewards.</p>
                        </div>
                        {/* Feature 2: Points & Levels */}
                    <div className="flex flex-col items-center p-8 rounded-2xl border border-purple-800">
                        <div className="bg-purple-500 bg-opacity-50 p-6 rounded-full">
                            <svg className="h-16 w-16 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h3 className="mt-8 text-3xl font-display text-black">Earn XP & Level Up</h3>
                        <p className="mt-4 text-gray-600">Gain experience points for every successful meetup and climb the ranks.</p>
                    </div>
                    {/* Feature 3: Avatars */}
                        <div className="flex flex-col items-center p-8 rounded-2xl border border-purple-800">
                            <div className="bg-purple-500 bg-opacity-50 p-6 rounded-full">
                                <svg className="h-16 w-16 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                            <h3 className="mt-8 text-3xl font-display text-black">Customize Your Avatar</h3>
                            <p className="mt-4 text-gray-600">Unlock unique gear for your profile picture as you complete challenges.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}