import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center px-6">
      <div>
        <p className="text-8xl font-extrabold text-primary-blue mb-4">404</p>
        <h1 className="text-3xl font-extrabold text-black-100 mb-4">Page Not Found</h1>
        <p className="text-grey mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="bg-primary-blue text-white font-bold px-8 py-3 rounded-full hover:bg-primary-blue/90">Go Home</Link>
          <Link href="/cars" className="border border-gray-200 text-black-100 font-bold px-8 py-3 rounded-full hover:bg-gray-100">Browse Cars</Link>
        </div>
      </div>
    </div>
  );
}
