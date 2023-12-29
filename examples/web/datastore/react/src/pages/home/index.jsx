import { Link } from "react-router-dom";
import { useUser } from "../../context/user";
import Auth from "./auth";

export default function HomePage() {
  const { getUserDetails } = useUser();
  const userDetails = getUserDetails();
  return (
    <>
      <div className="flex items-center">
        <div className="max-w-2xl py-32 mx-auto sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative px-3 py-1 text-sm leading-6 text-gray-600 rounded-full ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Get the source code here.{" "}
              <a
                href="https://github.com/muthaiyanmani/catalyst/tree/main/examples/web/datastore/react"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-indigo-600 cursor-pointer"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                Github <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              My Todos
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              An example showcasing Catalyst datastore with embeded
              authentication using react.
            </p>
            <div className="flex items-center justify-center mt-10 gap-x-6">
              {userDetails && (
                <Link
                  to="/dashboard"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Go to Dashboard
                </Link>
              )}

              <a
                target="_blank"
                href="https://docs.catalyst.zoho.com/en/sdk/web/v4/cloud-scale/data-store/get-component-instance/"
                className="text-sm font-semibold leading-6 text-gray-900"
                rel="noreferrer"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {!userDetails && <Auth />}
      </div>
    </>
  );
}
