import { useLayoutEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { matchPath, Outlet, useLocation, useMatch } from "react-router-dom";
import Header from "./Header";
import { auth } from "./Firebase";
import Login from "./Login";
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
    "/profile",
    "/sandbox",
    "/anime/:animeId",
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
  } else if (!user && headerMatch) {
    return <Login />;
  } else {
    return <Outlet />;
  }
};
