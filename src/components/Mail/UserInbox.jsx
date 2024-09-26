import React from "react";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import useInbox from "../../store/inbox-context";

const UserInbox = ({ inbox }) => {
	// console.log(inbox);
	const { handleMarkasRead } = useInbox();

	const handleRead = (mailID) => {
		handleMarkasRead(mailID);
	};

	return (
		<ul className="bg-white px-5 py-1 rounded-xl shadow-md flex h-full flex-col overflow-y-auto">
			{inbox.map((mail) => (
				<li key={mail.id} className="">
					<div className=" flex gap-3 max-sm:gap-0.5 px-0 w-full rounded hover:bg-black/15">
						<input
							type="checkbox"
							name=""
							id={mail.id}
							className=" ml-1 w-6 cursor-pointer max-xs:w-5"
						/>
						<span className="w-4 flex items-center">
							{mail.isRead ? (
								""
							) : (
								<GoDotFill className="text-blue-500" />
							)}
						</span>
						<Link
							to={`/home/inbox/${mail.id}`}
							onClick={() => handleRead(mail.id)}
							className="flex-1 px-2 py-3 grid grid-flow-col grid-cols-6 justify-items-center items-center cursor-pointer"
						>
							<p className="col-span-2 max-sm:col-span-4 justify-self-start max-xs:text-sm">
								{mail.from}
								<span className="hidden max-sm:block font-semibold max-xs:text-sm">
									{mail.subject}
								</span>
							</p>
							<p className="col-span-3 max-sm:hidden justify-self-start font-semibold max-xs:text-sm">
								{mail.subject}
							</p>
							<p className="col-span-1 justify-self-end max-sm:col-span-2 max-xs:text-sm">
								{new Date(mail.timestamp).toLocaleString(
									"en-US",
									{
										day: "numeric",
										month: "short",

										hour: "numeric",
										minute: "numeric",
										hour12: true,
									}
								)}
							</p>
						</Link>
					</div>
					<hr className="border-gray-400 my-1" />
				</li>
			))}
		</ul>
	);
};

export default UserInbox;
