import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
const AppLayout = lazy(() => import("./layouts/AppLayout"));
const Home = lazy(() => import("./pages/Home"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

// creating routes for future usecases
const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<div>Loading layout...</div>}>
        <AppLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading home...</div>}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
