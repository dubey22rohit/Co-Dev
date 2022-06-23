import { useCallback, useEffect, useRef, useState } from "react";

const useStateWithCallback = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const cbRef: any = useRef();

  const updateState = useCallback((newState, cb) => {
    cbRef.current = cb;

    setState((prev: any) => {
      return typeof newState === "function" ? newState(prev) : newState;
    });
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, updateState];
};

export default useStateWithCallback;
