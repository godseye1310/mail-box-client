import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import RootLayout from "./components/Layout/RootLayout";
import Home from "./pages/Home";
import MailPage from "./pages/MailPage";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <RootLayout />,
			id: "root",
			children: [
				{ path: "/", element: <SignInPage /> },
				{ path: "/home", element: <Home /> },

				{ path: "/mail", element: <MailPage /> },
			],
		},
	]);
	return <RouterProvider router={router} />;
};

export default App;
