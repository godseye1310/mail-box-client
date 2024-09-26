import React from "react";

const UserInbox = ({ inbox }) => {
	console.log(inbox);

	return (
		<div>
			<ul>
				{inbox.map((mail) => (
					<li
						key={mail.id}
						className="flex flex-wrap gap-3 w-full justify-evenly odd:bg-blue-300 even:bg-gray-400 shadow-sm border-b border-b-blue-500"
					>
						<p>{mail.from}</p>
						<p>{mail.subject}</p>
						<p>{mail.timestamp}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default UserInbox;
