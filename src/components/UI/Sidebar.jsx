import { NavLink, Link } from "react-router-dom";

const Sidebar = () => {
	return (
		<div className="w-36 max-sm:w-24 h-full bg-neutral-300 p-0">
			{/* Create Mail Button */}
			<div className="py-2 flex justify-center">
				<Link
					to="/mail"
					className="bg-red-500 hover:bg-red-600 border-none outline-none text-white text-lg px-3 py-2 rounded-3xl font-semibold max-sm:text-sm max-sm:px-1.5"
				>
					Compose +
				</Link>
			</div>
			<nav className="pt-3">
				<ul>
					<li className="">
						<NavLink
							to="/home/inbox"
							className={({ isActive }) =>
								` font-semibold py-1 flex justify-stretch px-8 max-sm:px-4 rounded-e-3xl  ${
									isActive
										? "text-neutral-100 bg-black/60 "
										: "hover:bg-black/30"
								}`
							}
						>
							<span>Inbox</span>
						</NavLink>
					</li>
					<li className="">
						<NavLink
							to="/home/sent"
							className={({ isActive }) =>
								` font-semibold py-1 flex justify-stretch px-8 max-sm:px-4 rounded-e-3xl  ${
									isActive
										? "text-neutral-100 bg-black/60 "
										: "hover:bg-black/30"
								}`
							}
						>
							<span>Sentbox</span>
						</NavLink>
					</li>
					<li className="">
						<span
							aria-disabled
							to="#"
							className={` font-semibold py-1 flex justify-stretch px-8 max-sm:px-4 rounded-e-3xl cursor-pointer ${
								false
									? "text-neutral-100 bg-black/60 "
									: "hover:bg-black/30"
							}`}
						>
							<span>others</span>
						</span>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
