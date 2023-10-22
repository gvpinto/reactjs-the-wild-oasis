import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, listenCapturing = false) {
  //   const closeWindow = useCallback((close) => {
  //     close();
  //   }, []);
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        console.log(ref.current && !ref.current.contains(e.target));
        // console.log('Global Click');
        if (ref.current && !ref.current.contains(e.target)) handler();
      }
      document.addEventListener('click', handleClick, listenCapturing);
      return () =>
        document.removeEventListener('click', handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return ref;
}
