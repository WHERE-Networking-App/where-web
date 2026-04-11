import Header from "@/components/common/header";
import { UpcomingMeetups } from "@/components/dashboard/UpcomingMeetups";
import { UserProfileSection } from "@/components/dashboard/UserProfileSection";

export default function DashboardPage() {
    return (
        <>
            <Header />
            <main className="container mx-auto p-6 text-center space-y-12">
                <UserProfileSection />
                <UpcomingMeetups />
            </main>
        </>
        
    )
}