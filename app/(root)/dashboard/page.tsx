import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Car, Calendar, User, Bell } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const user = await currentUser();

  const cards = [
    { icon: Calendar, label: "My Bookings", desc: "View upcoming, active & past rentals", href: "/dashboard/bookings", color: "bg-primary-blue" },
    { icon: User, label: "Profile", desc: "Manage your account & preferences", href: "/dashboard/profile", color: "bg-secondary-orange" },
    { icon: Car, label: "Browse Fleet", desc: "Discover and book new vehicles", href: "/cars", color: "bg-green-500" },
    { icon: Bell, label: "Notifications", desc: "Booking updates & special offers", href: "#", color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-16">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-black-100">
            Welcome back, {user?.firstName || "Driver"} 👋
          </h1>
          <p className="text-grey mt-1">What would you like to do today?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => (
            <Link key={c.label} href={c.href}>
              <div className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                <div className={`${c.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                  <c.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-extrabold text-black-100 text-lg mb-1">{c.label}</h3>
                <p className="text-grey text-sm">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
