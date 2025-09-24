  import { Routes, Route,  Navigate } from "react-router";
  import SignInPage from "./components/SignInPage";
  import MoodSelector from "./components/MoodSelector";
  import ExpressMood from "./components/ExpressMood";
  import ProtectedRoute from "./components/ProtectedRoute";
  import Home from "./Home";
  import { useLocation } from "react-router";
  import Suggestion from "./components/Suggestion";
  import Navbar from "./components/Navbar";
  import RegisterPage from "./components/RegisterPage";
  function App() {
    const location=useLocation();
    const path=location.pathname;
    console.log(path);
    return (
      <>
        {path != "/mood" && path != "/express" ? <Navbar /> : null}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="express" />} />
            <Route
              path="mood"
              element={
                <ProtectedRoute>
                  <MoodSelector />
                </ProtectedRoute>
              }
            />
            <Route
              path="express"
              element={
                <ProtectedRoute>
                  <ExpressMood />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="suggest" element={<ProtectedRoute><Suggestion /></ProtectedRoute>} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  }

  export default App;
