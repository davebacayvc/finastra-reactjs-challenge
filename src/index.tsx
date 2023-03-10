import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import REACT_ROUTES from "./constants/constants";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {REACT_ROUTES.map((REACT_ROUTE, index) => {
          return (
            <Route
              path={REACT_ROUTE.PATH}
              element={REACT_ROUTE.ELEMENT}
              key={index}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
