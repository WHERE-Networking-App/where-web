import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import { apiServer } from "@/lib/api-server";
import type { UserProfileApiResponse } from "@/lib/types";
import { JSX } from "react";

export const metadata = {
    title: 'WHERE - Connect with Tech Geeks Near You',
    description: 'WHERE is an AI-powered networking platform that connects tech professionals for meaningful meetups. Set your availability and let us match you with like-minded individuals for coffee, calls, or coworking sessions.',
    openGraph: {
        title: 'WHERE - Connect with Tech Geeks Near You',
        description: 'WHERE is an AI-powered networking platform that connects tech professionals for meaningful meetups. Set your availability and let us match you with like-minded individuals for coffee, calls, or coworking sessions.',
        url: 'https://where-ai.com',
        siteName: 'WHERE',
        images: []
    }
}

// Reads auth cookie at request time to personalise the header — must be dynamic
export const dynamic = "force-dynamic";

export default async function LandingPage(): Promise<JSX.Element> {
    // Attempt to fetch the profile; silently fallback to null if not logged in
    const { data } = await apiServer<UserProfileApiResponse>('/api/users/profile');
    const profile = data?.user ?? null;

    return (
        <>
            <Header profile={profile} />
            <HeroSection />
            <FeaturesSection />
            <Footer />
        </>
    )
}