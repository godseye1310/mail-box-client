import React from "react";
import AuthForm from "./components/Auth/Auth";
import Header from "./components/Layout/Header";

const App = () => {
	return (
		<div className="relative h-full w-full bg-gray-100">
			<Header />
			<AuthForm />
		</div>
	);
};

export default App;
