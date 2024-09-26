import React from "react";
import { MdLogin, MdLogout } from "react-icons/md";

import useAuth from "../../store/auth-context";
import { NavLink, useNavigate } from "react-router-dom";
import { BiDotsVertical, BiPlus } from "react-icons/bi";

const Header = () => {
	const { isLoggedIn, handleLogOut } = useAuth();
	const navigateTo = useNavigate();

	const logOut = () => {
		navigateTo("/", { replace: true });
		handleLogOut();
		console.log("Logged Out Successfully");
	};

	return (
		<header className={`flex flex-col px-0 py-2`}>
			<section className="flex items-center pt-1">
				<h1
					className={`flex flex-col pl-1 text-3xl text-red-950 font-bold max-xs:text-xl font-sans`}
				>
					WebMail
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
											? "text-2xl font-bold text-red-600 max-xs:text-lg"
											: "hover:text-red-600 text-xl"
									}`
								}
							>
								MailBox
							</NavLink>
						</li>

						<li className="bg-neutral-100 shadow-md rounded-full size-8 flex justify-center items-center">
							<NavLink
								to="/mail"
								className={({ isActive }) =>
									`transform font-bold  transition-all duration-150 max-xs:text-sm ${
										isActive
											? "text-3xl  font-extrabold text-red-600 max-xs:text-lg"
											: "hover:text-red-600 text-2xl text-gray-600"
									}`
								}
							>
								<BiPlus className=" self-baseline " />
							</NavLink>
						</li>

						<li>
							<NavLink
								to="/about"
								className={({ isActive }) =>
									`transform font-semibold transition-all duration-150 max-xs:text-sm ${
										isActive
											? "text-2xl font-bold text-red-600 max-xs:text-lg"
											: "hover:text-red-600 text-xl"
									}`
								}
							>
								About Us
							</NavLink>
						</li>
					</ul>
				</nav>
				<div className="ml-auto pr-2 flex gap-3 items-center">
					{isLoggedIn ? (
						<ul className="list-none">
							<li
								className={`font-bold ${
									false
										? "text-amber-600  "
										: "text-gray-900 hover:text-amber-500"
								}`}
							>
								<i>
									<BiDotsVertical className="text-xl" />
								</i>
							</li>
						</ul>
					) : (
						""
					)}
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
		</header>
	);
};

export default Header;
