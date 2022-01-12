import React, { useCallback, useState, useEffect } from "react";
import Button from "../src/components/Button";

const Code = ({ code }) => (
	<pre>
		<code>{JSON.stringify(code, null, 4)}</code>
	</pre>
);

// React internal hooks
// https://reactjs.org/docs/hooks-reference.html
// useState
// useEffect
// useMemo
// useRef
// useContext
// useReducer
// useLayoutEffect
// useCallback
// useImperativeHandle
// useDebugValue

const usePerson = () => {
	return { name: "Silke" };
};

const useData = url => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		setError(null);

		setTimeout(() => {
			fetch(url)
				.then(response => response.json())
				.then(json => {
					setData(json);
				})
				.catch(error_ => {
					console.log(error_);
					setError(error_);
				})
				.finally(() => {
					setLoading(false);
				});
		}, 6000);
	}, [url]);
	return {
		data,
		loading,
		error,
	};
};

const App = () => {
	const [url, setUrl] = useState("/api/animal.json");
	const { data, loading, error } = useData(url);
	return (
		<div>
			<Code code={data} />
			<h1>{loading ? "Loading..." : "There you go!"}</h1>
			<h2>{error ? "Opps" : "No Error"}</h2>

			<button
				onClick={() => {
					setUrl("/api/animal.json");
				}}
			>
				Get Animal
			</button>
			<button
				onClick={() => {
					setUrl("/api/person.json");
				}}
			>
				Get Person
			</button>
		</div>
	);
};

export default App;
