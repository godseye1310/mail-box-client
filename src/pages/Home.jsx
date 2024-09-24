import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	// const isLoggedIn =

	return (
		<div className={`px-0.5 py-4`}>
			<div className="flex justify-between overflow-hidden border-b-2 border-b-gray-400 px-1 pb-8">
				<h1 className="text-xl font-semibold">
					Welcome to your mail box!!!
				</h1>
			</div>

			<div className="py-5">
				<Link
					to="/mail"
					className="bg-rose-500 border-none outline-none text-white px-3 py-2 rounded-xl"
				>
					Create Mail
				</Link>
			</div>
		</div>
	);
};

export default Home;
