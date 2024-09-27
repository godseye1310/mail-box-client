import React from "react";
import useInbox from "../store/inbox-context";
import UserInbox from "../components/Mail/UserInbox";

const Sentbox = () => {
	const { sentMails } = useInbox();
	return (
		<div className="h-full px-2">
			<UserInbox emailData={sentMails} />
		</div>
	);
};

export default Sentbox;
