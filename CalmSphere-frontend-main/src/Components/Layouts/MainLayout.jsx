import { Outlet } from "react-router-dom";
import Nav from "../Nav";

import { ToastContainer } from "react-toastify";
import useAuthInterceptor from "../../utils/useAuthInterceptor";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";

const MainLayout = () => {
  useAuthInterceptor(); // Automatically logs out when token is invalid
  return (
    <div>
      <ScrollToTop />
      <Nav />
      <Outlet />
      <ToastContainer className={"text-center"} />
      <Footer />
    </div>
  );
};

export default MainLayout;
