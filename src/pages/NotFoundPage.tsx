import { Link } from "react-router";

export default function NotFoundPage() {
  return  (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        ⬅ Back to Home
      </Link>
    </div>
  );
}