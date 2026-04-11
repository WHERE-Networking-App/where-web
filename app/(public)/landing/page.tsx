import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
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

export default function LandingPage(): JSX.Element {
    return (
        <>
            <Header />
            <HeroSection />
            <FeaturesSection />
            <Footer />
        </>
    )
}