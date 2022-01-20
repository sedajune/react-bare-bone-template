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

const useMousePosition = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = event_ => {
			const { pageX, pageY } = event_;
			setPosition({ x: pageX, y: pageY });
			//console.log(event_.pageX, event_.pageY);
		};

		window.addEventListener("mousemove", handleMouseMove, { passive: true });

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return position;
};

const useWindowSize = () => {
	const [size, setSize] = useState({ width: 0, height: 0 });
	useEffect(() => {
		const handleResize = event_ => {
			const { innerWidth, innerHeight } = window;
			setSize({ width: innerWidth, height: innerHeight });
			//console.log(event_.pageX, event_.pageY);
		};
		handleResize();
		window.addEventListener("resize", handleResize), { passive: true };

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return size;
};

const App = () => {
	//const [url, setUrl] = useState("/api/animal.json");
	//const { data, loading, error } = useData(url);
	const position = useMousePosition();
	const size = useWindowSize();
	return (
		<div>
			<Code code={position} />
			<Code code={size} />
			<div
				style={{
					background: "blue",
					color: "white",
					position: "absolute",
					border: "1px solid white",
					top: position.y,
					left: position.x,
				}}
			>
				Hahahahahaha
			</div>
		</div>
	);
};

export default App;
