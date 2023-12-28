import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import { UserProvider } from "./context/user";
import DashboardPage from "./pages/dashboard";
import { ProtectedRoute } from "./utils/protected-route";

function App() {
  return (
    <>
      <UserProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </HashRouter>
      </UserProvider>
    </>
  );
}

export default App;
