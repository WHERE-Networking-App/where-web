import { AccountSetupFlow } from "@/components/auth/AccountSetupFlow";
import { redirect } from "next/navigation";

interface AccountSetupPageProps {
  searchParams: Promise<{ userId?: string }>
}


export default async function AccountSetupPage({ searchParams }: AccountSetupPageProps) {
    const resolvedParams = await searchParams;
    const userId = resolvedParams.userId;
    console.log(userId)
    
    if(!userId) redirect("/signup");

    return(
        <main className="flex justify-center items-center min-h-screen">
            <AccountSetupFlow userId={userId} />
        </main>
    )
}