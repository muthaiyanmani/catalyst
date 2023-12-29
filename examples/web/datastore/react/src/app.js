import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import { UserProvider } from "./context/user";
import DashboardPage from "./pages/dashboard";
import { ProtectedRoute } from "./utils/protected-route";
import Layout from "./components/layout";

function App() {
  return (
    <>
      <UserProvider>
        <Layout>
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
        </Layout>
      </UserProvider>
    </>
  );
}

export default App;
