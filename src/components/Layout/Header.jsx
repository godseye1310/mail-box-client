import React from "react";
import { MdLogin, MdLogout, MdSunny } from "react-icons/md";
// import { div, useNavigate } from "react-router-dom";
import { SiExpensify } from "react-icons/si";

import { FaMoon } from "react-icons/fa";

const Header = () => {
	const logOut = () => {
		// handleLogOut();
		// localStorage.removeItem("token");
	};

	return (
		<header className={`flex flex-col px-0 pb-0 pt-2`}>
			<section className="flex items-center p-0">
				<h1
					className={`flex flex-col pl-1 text-3xl font-bold max-xs:text-xl font-sans`}
				>
					MyWebLink
				</h1>
				<nav className="px-5">
					<ul
						className={`flex items-baseline gap-8 max-md:gap-2 max-xs:text-sm `}
					>
						<li>
							<div
								to="/home"
								className={`transform font-semibold transition-all duration-150 max-xs:text-sm ${
									false
										? "text-2xl font-bold text-blue-600 max-xs:text-lg"
										: "hover:text-blue-600"
								}`}
							>
								Home
							</div>
						</li>
						<li>
							<div
								to="/products"
								className={`transform font-semibold transition-all duration-150 max-xs:text-sm ${
									false
										? "text-2xl font-bold text-blue-600 max-xs:text-base"
										: "hover:text-blue-600"
								}`}
							>
								Products
							</div>
						</li>
						<li>
							<div
								to="/about"
								className={`transform font-semibold transition-all duration-150 max-xs:text-sm ${
									false
										? "text-2xl font-bold text-blue-600 max-xs:text-lg"
										: "hover:text-blue-600"
								}`}
							>
								About Us
							</div>
						</li>
					</ul>
				</nav>
				<div className="ml-auto pr-2">
					{true ? (
						<button
							onClick={logOut}
							className="flex items-center rounded bg-blue-950 p-1 text-white backdrop-blur hover:bg-blue-900"
						>
							<span className="pr-0.5 max-xs:hidden">Logout</span>
							<MdLogout />
						</button>
					) : (
						<div
							to="/"
							className="flex items-center rounded bg-blue-950 p-1 text-white backdrop-blur hover:bg-blue-900"
						>
							<span className="pr-0.5 max-xs:hidden">Login</span>
							<MdLogin />
						</div>
					)}
				</div>
			</section>
			<section
				className={`transition-max-height relative bg-blue-950 px-1 py-1.5 text-sm text-white transition-all duration-500 ease-in-out ${
					true ? "max-h-16" : "max-h-0 overflow-hidden"
				}`}
			>
				{
					<nav
						className={`flex w-full flex-wrap items-center justify-between py-1 ${
							true ? "scale-100" : "scale-0"
						}`}
					>
						<ul className="flex gap-x-4 pl-1">
							<div
								to="/profile"
								className={`font-bold decoration-4 underline-offset-8 hover:underline ${
									false
										? "text-amber-600 underline decoration-amber-600"
										: "text-gray-300 decoration-blue-500 hover:text-amber-500"
								}`}
							>
								<li>Profile</li>
							</div>

							<div
								to="/user-expense"
								className={`font-bold decoration-4 underline-offset-8 hover:underline ${
									false
										? "text-amber-600 underline decoration-amber-600"
										: "text-gray-300 decoration-blue-500 hover:text-amber-500"
								}`}
							>
								<li>Daily Expense</li>
							</div>
						</ul>

						{/* {isPremium && (
							<div className="absolute right-0 py-0.5">
								<button
									onClick={handleTheme}
									type="button"
									className={`relative flex h-7 w-14 items-center justify-center overflow-hidden rounded-full ${darkMode ? "bg-gray-900" : "bg-gray-300"}`}
								>
									<MdSunny
										className={`absolute size-6 transform text-amber-500 transition-all duration-500 ${darkMode ? "translate-x-3 opacity-100" : "-translate-x-10 opacity-0"}`}
									/>

									<FaMoon
										className={`absolute size-5 rotate-6 transform text-blue-600 transition-all duration-500 ${darkMode ? "translate-x-10 opacity-0" : "-translate-x-3 opacity-100"}`}
									/>
								</button>
							</div>
						)} */}
					</nav>
				}
			</section>
		</header>
	);
};

export default Header;
