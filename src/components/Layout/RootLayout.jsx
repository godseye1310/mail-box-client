import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { InboxProvider } from "../../store/inbox-context";

const RootLayout = () => {
	return (
		<main className="">
			<Header />
			<InboxProvider>
				<div className="relative h-full w-full bg-gray-100">
					<Outlet />
				</div>
			</InboxProvider>
		</main>
	);
};

export default RootLayout;
