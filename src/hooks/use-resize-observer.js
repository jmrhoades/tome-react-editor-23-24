/*
Copied from here
https://medium.com/@eymaslive/react-hooks-useobserve-use-resizeobserver-custom-hook-45ec95ad9844
*/

// import { useEffect, useRef } from "react";

// import ResizeObserver from "resize-observer-polyfill";

export const useObserver = ({ callback, element }) => {
	// const current = element && element.current;

	// const observer = useRef(null);

	// useEffect(() => {
	// 	// if we are already observing old element
	// 	if (observer && observer.current && current) {
	// 		observer.current.unobserve(current);
	// 	}
	// 	const resizeObserverOrPolyfill = ResizeObserver;
	// 	observer.current = new resizeObserverOrPolyfill(callback);
	// 	observe();

	// 	return () => {
	// 		if (observer && observer.current && element && element.current) {
	// 			observer.current.unobserve(element.current);
	// 		}
	// 	};
	// }, [current]);

	// const observe = () => {
	// 	if (element && element.current && observer.current) {
	// 		observer.current.observe(element.current);
	// 	}
	// };
};

/*
Copied from here
https://tobbelindstrom.com/blog/resize-observer-hook/
*/
/*
import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export const useResizeObserver = () => {
  const [entry, setEntry] = useState({});
  const [node, setNode] = useState(null);
  const observer = useRef(null);

  const disconnect = useCallback(() => {
    const { current } = observer;
    current && current.disconnect();
  }, []);

  const observe = useCallback(() => {
    observer.current = new ResizeObserver(([entry]) => setEntry(entry));
    node && observer.current.observe(node);
  }, [node]);

  useLayoutEffect(() => {
    observe();
    return () => disconnect();
  }, [disconnect, observe]);

  return [setNode, entry];
};
*/
