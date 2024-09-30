import React, { lazy, Suspense } from "react";
import {
	createBrowserRouter,
	createHashRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";

import { HashRouter as Router } from "react-router-dom";

import RootLayout from "./components/Layout/RootLayout";

import useAuth from "./store/auth-context";
import About from "./pages/About";
import Loader from "./components/UI/Loader";

const SignInPage = lazy(() => import("./pages/SignInPage"));
const Home = lazy(() => import("./pages/Home"));
const MailPage = lazy(() => import("./pages/MailPage"));
const Inbox = lazy(() => import("./pages/Inbox"));
const Sentbox = lazy(() => import("./pages/Sentbox"));
const MailView = lazy(() => import("./components/Mail/MailView"));

const App = () => {
	const { isLoggedIn } = useAuth();

	const router = createHashRouter([
		{
			path: "/",
			element: <RootLayout />,
			id: "root",
			children: [
				{
					path: "",
					element: (
						<Suspense fallback={null}>
							{" "}
							{!isLoggedIn ? (
								<SignInPage />
							) : (
								<Navigate to="/home" />
							)}
						</Suspense>
					),
				},
				{
					path: "home",
					element: (
						<Suspense fallback={<Loader />}>
							{isLoggedIn ? <Home /> : <Navigate to="/" />}
						</Suspense>
					),
					children: [
						{
							path: "",
							element: (
								<Suspense fallback={<Loader />}>
									<Navigate to="/home/inbox" replace={true} />
								</Suspense>
							),
						},

						{
							path: "inbox",
							element: (
								<Suspense fallback={<Loader />}>
									<Inbox />
								</Suspense>
							),
						}, // Inbox sub-route
						{
							path: "inbox/:inboxmailID",
							element: (
								<Suspense fallback={<Loader />}>
									<MailView />
								</Suspense>
							),
						},

						{
							path: "sent",
							element: (
								<Suspense fallback={<Loader />}>
									<Sentbox />
								</Suspense>
							),
						}, // Sent sub-route
						{
							path: "sent/:sentmailID",
							element: (
								<Suspense fallback={<Loader />}>
									<MailView />
								</Suspense>
							),
						},

						{ path: "*", element: <Navigate to="/" /> },
					],
				},
				{
					path: "about",
					element: <About />,
				},

				...(isLoggedIn
					? [
							{
								path: "mail",
								element: (
									<Suspense fallback={<Loader />}>
										<MailPage />
									</Suspense>
								),
							},
					  ]
					: []),

				{ path: "*", element: <Navigate to="/" /> },
			],
		},
	]);
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
