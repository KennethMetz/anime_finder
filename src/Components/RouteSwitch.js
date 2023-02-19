import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import { LocalUserProvider } from "./LocalUserContext";
import Profile from "./Profile";
import Onboarding from "./Onboarding";
import Home from "./Home";
import DetailedView from "./DetailedView";
import Search from "./Search";
import Logout from "./Logout";
import Sandbox from "./Sandbox";
import { RoutingHelper } from "./RoutingHelper";
import { NotFound404 } from "./NotFound404";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LandingPage from "./LandingPage";
import AppSettingsProvider from "./AppSettingsProvider";
import AppThemeProvider from "./AppThemeProvider";

const queryClient = new QueryClient();

const RouteSwitch = () => {
  return (
    <AppSettingsProvider>
      <AppThemeProvider>
        <BrowserRouter>
          <LocalUserProvider>
            <QueryClientProvider client={queryClient}>
              <Routes>
                <Route element={<RoutingHelper />}>
                  <Route path="/reset" element={<Reset />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/anime/:animeId" element={<DetailedView />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/sandbox" element={<Sandbox />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<NotFound404 />} />
                  <Route path="/" element={<LandingPage />} />
                </Route>
              </Routes>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </LocalUserProvider>
        </BrowserRouter>
      </AppThemeProvider>
    </AppSettingsProvider>
  );
};
export default RouteSwitch;
