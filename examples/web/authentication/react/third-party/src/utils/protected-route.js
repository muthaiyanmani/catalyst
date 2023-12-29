import { useUser } from "../context/user";

export const ProtectedRoute = ({ children }) => {
  const { getUserDetails } = useUser();

  if (getUserDetails()) {
    return children;
  } else {
    window.location.href = "/";
    // navigate("/__catalyst/auth/login", { replace: true });
  }
};
