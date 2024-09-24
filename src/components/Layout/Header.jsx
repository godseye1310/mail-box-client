import React from "react";
import { MdLogin, MdLogout } from "react-icons/md";

import useAuth from "../../store/auth-context";
import { NavLink } from "react-router-dom";

const Header = () => {
	const { isLoggedIn, handleLogOut } = useAuth();
	// console.log(isLoggedIn);

	const logOut = () => {
		handleLogOut();
	};

	return (
		<header className={`flex flex-col px-0 pb-0`}>
			<section className="flex items-center pt-1">
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
							<NavLink
								to="/home"
								className={({ isActive }) =>
									`transform font-semibold transition-all duration-150 max-xs:text-sm ${
										isActive
											? "text-2xl font-bold text-blue-600 max-xs:text-lg"
											: "hover:text-blue-600"
									}`
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/mails"
								className={({ isActive }) =>
									`transform font-semibold transition-all duration-150 max-xs:text-sm ${
										isActive
											? "text-2xl font-bold text-blue-600 max-xs:text-base"
											: "hover:text-blue-600"
									}`
								}
							>
								Mail Box
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/about"
								className={({ isActive }) =>
									`transform font-semibold transition-all duration-150 max-xs:text-sm ${
										isActive
											? "text-2xl font-bold text-blue-600 max-xs:text-lg"
											: "hover:text-blue-600"
									}`
								}
							>
								About Us
							</NavLink>
						</li>
					</ul>
				</nav>
				<div className="ml-auto pr-2">
					{isLoggedIn ? (
						<button
							onClick={logOut}
							className="flex items-center rounded bg-blue-950 p-1 text-white backdrop-blur hover:bg-blue-900"
						>
							<span className="pr-0.5 max-xs:hidden">Logout</span>
							<MdLogout />
						</button>
					) : (
						<NavLink
							to="/"
							className="flex items-center rounded bg-blue-950 p-1 text-white backdrop-blur hover:bg-blue-900"
						>
							<span className="pr-0.5 max-xs:hidden">Login</span>
							<MdLogin />
						</NavLink>
					)}
				</div>
			</section>
			<section
				className={`transition-max-height relative bg-blue-950 px-1 py-1.5 text-sm text-white transition-all duration-500 ease-in-out ${
					isLoggedIn ? "max-h-16" : "max-h-0 overflow-hidden"
				}`}
			>
				<nav
					className={`flex w-full flex-wrap items-center justify-between py-1 ${
						isLoggedIn ? "scale-100" : "scale-0"
					}`}
				>
					<ul className="flex gap-x-4 pl-1">
						<li
							className={`font-bold decoration-4 underline-offset-8 hover:underline ${
								false
									? "text-amber-600 underline decoration-amber-600"
									: "text-gray-300 decoration-blue-500 hover:text-amber-500"
							}`}
						>
							<i>Profile</i>
						</li>

						<NavLink
							to="/mail"
							className={({ isActive }) =>
								`font-bold decoration-4 underline-offset-8 hover:underline ${
									isActive
										? "text-amber-600 underline decoration-amber-600"
										: "text-gray-300 decoration-blue-500 hover:text-amber-500"
								}`
							}
						></NavLink>
					</ul>
				</nav>
			</section>
		</header>
	);
};

export default Header;
