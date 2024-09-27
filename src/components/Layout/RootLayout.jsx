import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { MailboxProvider } from "../../store/mailbox-context";

const RootLayout = () => {
	return (
		<main className="">
			<Header />
			<MailboxProvider>
				<div className="relative h-full w-full bg-gray-100">
					<Outlet />
				</div>
			</MailboxProvider>
		</main>
	);
};

export default RootLayout;
