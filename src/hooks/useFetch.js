import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (url, method = "GET") => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = useCallback(
		async (payload = null) => {
			setLoading(true);
			try {
				const response = await axios({
					method,
					url,
					data: payload,
				});
				setData(response.data);

				return response.data;
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		},
		[url, method]
	);

	// Automatically trigger GET requests
	useEffect(() => {
		if (method === "GET") {
			fetchData();
		}
	}, [fetchData, method]);

	return { data, loading, error, fetchData };
};

export default useFetch;
