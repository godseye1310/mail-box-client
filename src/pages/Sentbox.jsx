import React from "react";
import useMailbox from "../store/mailbox-context";
import Mailbox from "../components/Mail/Mailbox";

const Sentbox = () => {
	const { sentMails } = useMailbox();
	return (
		<div className="h-full px-2">
			<Mailbox emailData={sentMails} />
		</div>
	);
};

export default Sentbox;
