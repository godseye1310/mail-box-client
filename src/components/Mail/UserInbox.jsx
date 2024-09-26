import React from "react";

const UserInbox = ({ inbox }) => {
	console.log(inbox);

	return (
		<ul className="bg-white px-5 py-1 rounded-xl shadow-md flex h-full flex-col overflow-y-auto">
			{inbox.map((mail) => (
				<li key={mail.id} className="">
					<div className=" flex gap-6 max-sm:gap-1 px-0 w-full rounded hover:bg-black/15">
						<input
							type="checkbox"
							name=""
							id={mail.id}
							className=" ml-1 w-6 cursor-pointer max-xs:w-5"
						/>
						<div className="flex-1 px-2 py-3 grid grid-flow-col grid-cols-6 justify-items-center items-center cursor-pointer">
							<p className="col-span-2 max-sm:col-span-4 justify-self-start max-xs:text-sm">
								{mail.from}
								<p className="hidden max-sm:block font-semibold max-xs:text-sm">
									{mail.subject}
								</p>
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
						</div>
					</div>
					<hr className="border-gray-400 my-1" />
				</li>
			))}
		</ul>
	);
};

export default UserInbox;
