import { useCallback, useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export const useRevalidate = () => {
  // We get the navigate function from React Rotuer
  let navigate = useNavigate();
  // And return a function which will navigate to `.` (same URL) and replace it
  return useCallback(
    function revalidate() {
      navigate(".", { replace: true });
    },
    [navigate]
  );
};

export const useRevalidateOnFocus = ({
  enabled = false,
}: {
  enabled?: boolean;
}) => {
  let revalidate = useRevalidate();

  useEffect(
    function revalidateOnFocus() {
      if (!enabled) return;
      function onFocus() {
        revalidate();
      }
      window.addEventListener("focus", onFocus);
      return () => window.removeEventListener("focus", onFocus);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [revalidate]
  );

  useEffect(
    function revalidateOnVisibilityChange() {
      if (!enabled) return;
      function onVisibilityChange() {
        revalidate();
      }
      window.addEventListener("visibilitychange", onVisibilityChange);
      return () =>
        window.removeEventListener("visibilitychange", onVisibilityChange);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [revalidate]
  );
};