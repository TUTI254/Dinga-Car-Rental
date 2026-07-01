import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { UserProfile } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-16">
        <Link href="/dashboard" className="flex items-center gap-2 text-grey text-sm mb-6 hover:text-black-100">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-extrabold text-black-100 mb-8">My Profile</h1>
        <UserProfile
          appearance={{
            elements: {
              card: "shadow-lg rounded-3xl border border-gray-100",
              headerTitle: "text-black-100 font-extrabold",
              formButtonPrimary: "bg-primary-blue hover:bg-primary-blue/90",
            },
          }}
        />
      </div>
    </div>
  );
}
