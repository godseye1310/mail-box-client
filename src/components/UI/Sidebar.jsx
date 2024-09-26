import { NavLink, Link } from "react-router-dom";

const Sidebar = () => {
	return (
		<div className="w-36 h-full bg-gray-200 p-4">
			{/* Create Mail Button */}
			<div className="py-5">
				<Link
					to="/mail"
					className="bg-rose-500 border-none outline-none text-white px-3 py-2 rounded-xl"
				>
					Compose +
				</Link>
			</div>
			<nav>
				<ul>
					<li className="mb-4">
						<NavLink to="/home/inbox" className="text-blue-500">
							Inbox
						</NavLink>
					</li>
					<li>
						<NavLink to="/home/sent" className="text-blue-500">
							Sent
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
