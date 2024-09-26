import React from "react";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import RootLayout from "./components/Layout/RootLayout";
import Home from "./pages/Home";
import MailPage from "./pages/MailPage";
import useAuth from "./store/auth-context";
import About from "./pages/About";
import Inbox from "./pages/Inbox";

const App = () => {
	const { isLoggedIn } = useAuth();

	const router = createBrowserRouter([
		{
			path: "/",
			element: <RootLayout />,
			id: "root",
			children: [
				{
					path: "/",
					element: !isLoggedIn ? (
						<SignInPage />
					) : (
						<Navigate to="/home" />
					),
				},
				{
					path: "/home",
					element: isLoggedIn ? <Home /> : <Navigate to="/" />,
					children: [
						{ path: "inbox", element: <Inbox /> }, // Inbox sub-route
						// { path: "sent", element: <Sent /> },    // Sent sub-route
					],
				},
				{
					path: "/about",
					element: <About />,
				},

				...(isLoggedIn
					? [{ path: "/mail", element: <MailPage /> }]
					: []),
			],
		},
	]);
	return <RouterProvider router={router} />;
};

export default App;
