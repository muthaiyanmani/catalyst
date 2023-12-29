import { useEffect } from "react";
import { useUser } from "../../context/user";
import { toast } from 'react-toastify';

export default function DashboardPage() {
  const { getUserDetails } = useUser();
  const userDetails = getUserDetails();

  useEffect(() => {
    enablePushNotification();
  }, []);

  const enablePushNotification = async () => {
    try {
      await window.catalyst.notification.enableNotification();
      window.catalyst.notification.messageHandler = (payload) => {
        toast.success(payload);
      };
    } catch (err) {
      console.log(err);
    }
  };

  const sendNotification = async () => { 
    try {
      const resp = await fetch('/server/push_notification/send');
      const message = await resp.json();
      //await window.catalyst.function.functionId("push_notification").execute();
    } catch (err) {
      console.log(err);
    }
  }

  const logoutUser = async () => {
    try {
      await window.catalyst.auth.signOut("/");
      // window.location.href = '/__catalyst/auth/login';
    } catch (err) {
      console.log(err);
    }
  };

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
          <div className="max-w-2xl mx-auto sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Dashboard
              </h1>

              <ul className="mt-6 text-lg leading-8 text-gray-600">
                <li>
                  {" "}
                  Name: {userDetails?.first_name} {userDetails?.last_name}
                </li>
                <li> Email: {userDetails?.email_id}</li>
                <li> User Status: {userDetails?.status}</li>
                <li>User Type: {userDetails?.user_type}</li>
              </ul>

              <div className="flex items-center justify-center mt-10 gap-x-6">
              <button
                  onClick={sendNotification}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Push Notification
                </button>
                <button
                  onClick={logoutUser}
                  className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Sign Out
                </button>
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