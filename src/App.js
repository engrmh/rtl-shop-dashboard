import React from "react";
import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import Header from "./Components/Header/Header";
import routes from "./routes";
import { useRoutes } from "react-router-dom";

export default function App() {
  const router = useRoutes(routes);
  return (
    <div className="d-flex">
      <SideBar />
      <div className="main col-10 px-3 pt-3 vh-100 overflow-auto">
        <Header />
        {router}
      </div>
    </div>
  );
}
