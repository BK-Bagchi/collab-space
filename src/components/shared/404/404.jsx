import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-36 text-center bg-softWhite text-charcoalGray logo-font">
      <h1
        className="text-[10rem] font-bold heading-font"
        style={{ lineHeight: "1" }}
      >
        404
      </h1>
      <h2 className="text-3xl font-semibold mt-4 body-font">Page Not Found</h2>
      <p className="mt-2 text-gray-500 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-md text-white bg-electricBlue font-semibold transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
