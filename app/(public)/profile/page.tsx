import Header from "@/components/common/header";
import { Profile } from "@/components/profile/Profile";
import { apiServer } from "@/lib/api-server";
import type { UserProfileApiResponse } from "@/lib/types";

// This page reads the auth cookie at request time — must be dynamic
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
    const profileRes = await apiServer<UserProfileApiResponse>("/api/users/profile");
    const profile = profileRes.data ?? null;
    const profileUser = profile?.user ?? null;
  return (
    <>
        <Header profile={profileUser} />
        <Profile profile={profile} />
    </>
    
  );
}