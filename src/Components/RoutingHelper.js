import { useLayoutEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { matchPath, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { auth, logInAnon } from "./Firebase";
import BreathingLogo from "./BreathingLogo";

export const RoutingHelper = () => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();

  // Scroll to top if path changes.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const headerRoutes = [
    "/home",
    "/search",
    "/sandbox",
    "/anime/:animeId",
    "/profile/:userId",
    "/profile/:userId/list/:listId",
  ];
  const noHeaderRoutes = [
    "/login",
    "/logout",
    "/",
    "/register",
    "/reset",
    "/onboarding",
  ];

  let headerMatch = false;
  let noHeaderMatch = false;

  headerMatch = headerRoutes.find((item) => {
    return matchPath({ path: item }, location.pathname);
  });

  noHeaderMatch = noHeaderRoutes.find((item) => {
    return matchPath({ path: item }, location.pathname);
  });

  if (loading && !user) {
    return <BreathingLogo type={"fullPage"} />;
  } else if (user && headerMatch) {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  } else if (noHeaderMatch) {
    return <Outlet />;
  } else if (!loading && !user && headerMatch) {
    logInAnon();
  } else {
    return <Outlet />;
  }
};
