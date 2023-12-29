import { Link } from "react-router-dom";
import { useUser } from "../../context/user";
import { useAuth0 } from "@auth0/auth0-react";

export default function HomePage() {
  const { getUserDetails } = useUser();
  const { loginWithRedirect } = useAuth0();
  const userDetails = getUserDetails();

  return (
    <>
      <div className="bg-white">
        <div className="relative px-6 isolate pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 overflow-hidden -top-40 -z-10 transform-gpu blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }}
            />
          </div>
          <div className="flex items-center">
            <div className="max-w-2xl py-32 mx-auto sm:py-48 lg:py-56">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative px-3 py-1 text-sm leading-6 text-gray-600 rounded-full ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Get the source code here.{" "}
                  <a
                    href="https://github.com/muthaiyanmani/catalyst/tree/main/examples/web/authentication/react/third-party"
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
                  Catalyst Examples
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  An example showcasing Catalyst third party authentication
                  using vite + react and Auth0.
                </p>
                <div className="flex items-center justify-center mt-10 gap-x-6">
                  {userDetails ? (
                    <Link
                      to="/dashboard"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Go to Dashboard
                    </Link>
                  ) : (
                    <button
                      onClick={loginWithRedirect}
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Login using Auth0
                    </button>
                  )}
                  <a
                    target="_blank"
                    href="https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/third-party-authentication/introduction/"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    rel="noreferrer"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
