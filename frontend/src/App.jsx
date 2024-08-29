import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Transaction from "./pages/Transaction";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

import { useQuery } from "@apollo/client";
import Toaster from "react-hot-toast";

import { GET_AUTHENTICATED_USER } from "./graphql/quries/user.query";

function App() {
  const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) return null;

  console.log("Authenticated User", data);

  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={data.authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!data.authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!data.authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={data.authUser ? <Transaction /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
