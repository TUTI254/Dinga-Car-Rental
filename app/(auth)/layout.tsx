export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-blue/5 via-white to-secondary-orange/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <span className="text-2xl font-extrabold text-black-100">Dinga</span>
            <span className="text-2xl font-extrabold text-primary-blue">Car Rentals</span>
          </a>
        </div>
        {children}
      </div>
    </div>
  );
}
