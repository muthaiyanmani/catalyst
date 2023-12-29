import { useState } from "react";
import { camelToSnake } from "../../utils/conversion";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const defaultValues = {
  firstName: "",
  lastName: "",
  emailId: "",
  platformType: "web"
};

export default function Auth() {
  const [userDetails, setUserDetails] = useState(defaultValues);
  const tabs = [
    {
      name: "Sign Up",
      value: "signup"
    },
    {
      name: "Sign In",
      value: "signin"
    }
  ];
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const onChangeTab = (value) => {
    if (value === "signin") {
      const config = {
        // css_url: "/app/css/signin.css"
      };
      window.catalyst.auth.signIn("signin-frame", config);
    }
    setCurrentTab(value);
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = camelToSnake(userDetails);
    try {
      await window.catalyst.auth.signUp(data);
      alert("Check your email for verification link");
      setUserDetails(defaultValues);
    } catch (err) {
      alert("Something went wrong! Please try again.");
    }
  };
  return (
    <>
      <div
        dir="ltr"
        data-orientation="horizontal"
        className="w-full max-w-md mx-auto my-8 text-black "
      >
        <div
          data-state="inactive"
          data-orientation="horizontal"
          role="tabpanel"
          aria-labelledby="radix-:r6:-trigger-signin"
          id="radix-:r6:-content-signin"
          tabIndex="0"
          className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div
            className="p-8 space-y-6 bg-white border rounded-lg shadow-sm text-card-foreground"
            data-v0-t="card"
          >
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px space-x-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab.name}
                      onClick={() => onChangeTab(tab.value)}
                      className={classNames(
                        currentTab === tab.value
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                      )}
                      aria-current={
                        currentTab === tab.value ? "page" : undefined
                      }
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
            {currentTab === "signup" && (
              <div className="p-2 space-y-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="first-name"
                  >
                    First Name
                  </label>
                  <input
                    className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required=""
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        firstName: e.target.value
                      })
                    }
                    id="first-name"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="last-name"
                  >
                    Last Name
                  </label>
                  <input
                    className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="last-name"
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        lastName: e.target.value
                      })
                    }
                    required=""
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    required=""
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        emailId: e.target.value
                      })
                    }
                    type="email"
                  />
                </div>
                <br />
                <button
                  onClick={onSignUp}
                  className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-white transition-colors bg-indigo-500 rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90"
                >
                  Sign Up
                </button>
              </div>
            )}

            {currentTab === "signin" && (
              <div className="h-80" id="signin-frame"></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
