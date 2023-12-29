import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import { UserProvider } from "./context/user";
import { ProtectedRoute } from "./utils/protected-route";
import { useEffect } from "react";

function App() {
 useEffect(() => { 
    window.catalyst.initApp(
      {
        project_Id: "20975000000007092", //No I18N
        zaid: "10070469055", //No I18N
        auth_domain: "https://accounts.zohoportal.com"
      },
      {
        org_id: "840233827" //No I18N
      }
    );
      
   
   
  }, []);
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
