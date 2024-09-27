import Mailbox from "../components/Mail/Mailbox";
import useMailbox from "../store/mailbox-context";

const Inbox = () => {
	const { inbox } = useMailbox();

	return (
		<div className="h-full px-2">
			<Mailbox emailData={inbox} />
		</div>
	);
};

export default Inbox;
