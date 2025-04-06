import { auth } from "@/services/auth";
import { ProfileForm } from "./_components/profile-form";

export default async function Page() {
  const session = await auth();

  return <ProfileForm defaultValues={session?.user} />;
}
