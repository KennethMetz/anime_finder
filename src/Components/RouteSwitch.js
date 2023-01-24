import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import Header from "./Header";
import { LocalUserProvider } from "./LocalUserContext";
import Profile from "./Profile";
import Onboarding from "./Onboarding";
import Home from "./Home";
import DetailedView from "./DetailedView";
import Search from "./Search";
import Logout from "./Logout";
import Sandbox from "./Sandbox";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { HeaderLayout, NoHeaderLayout } from "./Layout";
import { LandingPage } from "./LandingPage";
import { NotFound404 } from "./NotFound404";

const RouteSwitch = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <LocalUserProvider>
          <Routes>
            <Route element={<LandingPage />}>
              {/* <Route element={<HeaderLayout />}> */}
              <Route path="/reset" element={<Reset />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/anime/:animeId" element={<DetailedView />} />
              <Route path="/home" element={<Home />} />
              <Route path="/sandbox" element={<Sandbox />} />
              {/* </Route>
            <Route element={<NoHeaderLayout />}> */}
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/" element={<Onboarding />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound404 />} />
            </Route>
          </Routes>
        </LocalUserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default RouteSwitch;
