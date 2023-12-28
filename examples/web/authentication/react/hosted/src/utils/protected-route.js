import { useUser } from "../context/user";

export const ProtectedRoute = ({ children }) => {
  const { getUserDetails } = useUser();

  if (getUserDetails()) {
    return children;
  } else {
    window.location.href = "/__catalyst/auth/login";
    // navigate("/__catalyst/auth/login", { replace: true });
  }
};
