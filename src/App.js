import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import RootLayout from "./components/Layout/RootLayout";
import Home from "./pages/Home";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <RootLayout />,
			id: "root",
			children: [
				{ path: "/", element: <SignInPage /> },
				{ path: "/home", element: <Home /> },
			],
		},
	]);
	return <RouterProvider router={router} />;
};

export default App;
