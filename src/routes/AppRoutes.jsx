import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import Home from "../pages/Home";
import TodoDetails from "../pages/TodoDetails";
import NotFound from "../pages/NotFound";
import ErrorTest from "../pages/ErrorTest";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Suspense
        fallback={
          <div className="text-center mt-20">

            <h2 className="text-xl font-semibold">

              Loading...

            </h2>

            <p className="text-gray-600">

              Please wait

            </p>

          </div>
        }
      >

        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Todo Details */}
          <Route
            path="/todos/:id"
            element={<TodoDetails />}
          />

          {/* Error Boundary Test */}
          <Route
            path="/error"
            element={<ErrorTest />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </Suspense>

    </BrowserRouter>

  );

}