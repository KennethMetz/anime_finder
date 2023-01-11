import { Outlet } from "react-router-dom";
import Header from "./Header";

export const HeaderLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export const NoHeaderLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
