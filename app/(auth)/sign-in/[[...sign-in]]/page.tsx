import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        elements: {
          card: "shadow-xl rounded-2xl border border-gray-100",
          headerTitle: "text-black-100 font-extrabold",
          formButtonPrimary: "bg-primary-blue hover:bg-primary-blue/90 text-white",
          footerActionLink: "text-primary-blue hover:text-primary-blue/80",
        },
      }}
    />
  );
}
