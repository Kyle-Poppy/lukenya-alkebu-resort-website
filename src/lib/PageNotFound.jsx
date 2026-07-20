import { Link, useLocation } from "react-router-dom";

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname;

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="max-w-lg text-center">

        <h1 className="text-8xl font-bold text-burnt">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-navy">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-600">
          Sorry, the page
          <span className="font-semibold text-burnt">
            {" "}
            {pageName}
          </span>
          {" "}does not exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 px-8 py-3 rounded-lg bg-burnt text-white hover:bg-burnt-light transition"
        >
          Return to Home
        </Link>

      </div>
    </div>
  );
}