import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/UI/Sidebar";
// import useAuth from "../store/auth-context";

const Home = () => {
	// const isLoggedIn = useAuth();

	return (
		<div className="flex w-full h-calc-dvh relative bg-neutral-100 max-xs:h-calc-dvh-xs overflow-hidden">
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col px-0.5 py-4">
				<div className="flex justify-between overflow-hidden border-b-2 border-b-gray-400 px-1 pb-2">
					<h1 className="text-xl font-semibold">
						Welcome to your mailbox!
					</h1>
				</div>

				{/* Outlet for rendering inbox/sent sub-routes */}
				<div className="pt-4 flex-grow flex flex-col">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Home;
