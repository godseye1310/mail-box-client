import UserInbox from "../components/Mail/UserInbox";
import useInbox from "../store/inbox-context";

const Inbox = () => {
	const { inbox } = useInbox();

	return (
		<div className="h-full px-2">
			<UserInbox emailData={inbox} />
		</div>
	);
};

export default Inbox;
