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
import Sentbox from "./pages/Sentbox";
import MailView from "./components/Mail/MailView";
// import useMailbox from "./store/inbox-context";

const App = () => {
	const { isLoggedIn } = useAuth();

	// const { inbox } = useMailbox();
	// console.log(inbox);

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
						{ path: "inbox/:inboxmailID", element: <MailView /> },
						{ path: "sent", element: <Sentbox /> }, // Sent sub-route
						{ path: "sent/:sentmailID", element: <MailView /> },
						{
							path: "",
							element: (
								<Navigate to="/home/inbox" replace={true} />
							),
						},
						{ path: "*", element: <Navigate to="/" /> },
					],
				},
				{
					path: "/about",
					element: <About />,
				},

				...(isLoggedIn
					? [{ path: "/mail", element: <MailPage /> }]
					: []),

				{ path: "*", element: <Navigate to="/" /> },
			],
		},
	]);
	return <RouterProvider router={router} />;
};

export default App;
