import { useEffect, useLayoutEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { matchPath, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { auth } from "./Firebase";
import useAuthActions from "../Hooks/useAuthActions";
import BreathingLogoNew from "./BreathingLogoNew";

export const RoutingHelper = () => {
  const [user, loading, error] = useAuthState(auth);
  const authActions = useAuthActions();

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

  useEffect(() => {
    if (!loading && !user && headerMatch) {
      authActions.registerAnonymously();
    }
  }, [loading, user, headerMatch]);

  if (loading && !user) {
    return <BreathingLogoNew type={"fullPage"} />;
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
    return <BreathingLogoNew type={"fullPage"} />;
  } else {
    return <Outlet />;
  }
};
