import { useAuthState } from "react-firebase-hooks/auth";
import { matchPath, Outlet, useLocation, useMatch } from "react-router-dom";
import Header from "./Header";
import { auth } from "./Firebase";
import Login from "./Login";
import BreathingLogo from "./BreathingLogo";

export const LandingPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();

  const headerRoutes = [
    "/home",
    "/search",
    "/profile",
    "/reset",
    "/sandbox",
    "/anime/:animeId",
  ];
  const noHeaderRoutes = ["/login", "/logout", "/", "/register", "reset"];

  let headerMatch = false;
  let noHeaderMatch = false;

  headerRoutes.map((item, index) => {
    if (matchPath({ path: item }, location.pathname)) headerMatch = true;
  });

  noHeaderRoutes.map((item, index) => {
    if (matchPath({ path: item }, location.pathname)) noHeaderMatch = true;
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
