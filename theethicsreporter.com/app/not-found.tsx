import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-300 mb-4 font-sans">404</h1>
      <h2 className="text-2xl font-bold mb-4 font-sans">Page Not Found</h2>
      <p className="text-gray-600 mb-8 font-serif">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-brand text-white rounded font-semibold text-sm hover:bg-brand-dark transition-colors font-sans"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
