import { Navigate, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  //@ts-ignore
  const { authUser } = useAuthContext();
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={!authUser ? <Navigate to={"/login"} /> : <Dashboard />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to={"/"} /> : <Register />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
