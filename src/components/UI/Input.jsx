import React, { useRef, useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const Input = ({ label, id, type, value, onChange, autoFocus, isSignUp }) => {
	const passwordType = useRef();
	const [show, setShow] = useState(false);
	const showPassword = (e) => {
		e.preventDefault();
		if (id === "password") {
			setShow((prev) => !prev);
			if (passwordType.current.type === "password") {
				passwordType.current.type = "text";
			} else {
				passwordType.current.type = "password";
			}
		}
	};

	return (
		<div className="relative w-full">
			<input
				id={id}
				name={id}
				type={type}
				value={value}
				onChange={onChange}
				ref={passwordType}
				required
				placeholder=" "
				autoFocus={autoFocus}
				autoComplete=""
				className={`loginput peer block w-full appearance-none text-sm outline-none focus:border-blue-400 focus:outline-none focus:ring-0 focus-visible:outline-none ${
					isSignUp
						? "rounded-md border-2 border-gray-300 bg-transparent px-3 pb-2 pt-2.5 font-medium text-gray-900 focus:bg-blue-50 focus:bg-opacity-30"
						: "rounded-3xl border-none bg-black px-4 pb-3 pt-3 font-semibold text-[#f5f5f5] focus:bg-black focus:bg-opacity-100 focus-visible:bg-black"
				}`}
			/>
			<label
				htmlFor={id}
				className={`absolute origin-left transform bg-gray-100 text-gray-500 duration-300 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-110 peer-focus:scale-100 ${
					isSignUp
						? "-top-1 left-3 -translate-y-3 peer-focus:-translate-y-3"
						: "-top-0 left-4 -translate-y-5 bg-transparent text-sm font-semibold peer-focus:-translate-y-5"
				}`}
			>
				{label}
			</label>
			{id === "password" && !isSignUp && (
				<button
					onClick={showPassword}
					className="absolute right-3 top-3 text-white"
				>
					{show ? <BiSolidHide /> : <BiSolidShow />}
				</button>
			)}
			<span
				className={`absolute translate-x-full transform px-1 text-sm text-red-500 transition-all duration-300`}
			></span>
		</div>
	);
};

export default Input;
