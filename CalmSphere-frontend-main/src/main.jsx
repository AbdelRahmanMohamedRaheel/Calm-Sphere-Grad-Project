import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "react-toastify/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./utils/i18n.js";

// // Import Other Libraries
// import "../src/assets/js/jquery-3.4.1.min.js";
// import "../src/assets/lib/wow/wow.min.js";
// import "../src/assets/lib/easing/easing.js";
// import "../src/assets/lib/waypoints/waypoints.js";
// import "../src/assets/lib/counterup/counterup.min.js";
// import "../src/assets/lib/owlcarousel/owl.carousel.js";
// import "../src/assets/lib/tempusdominus/js/moment.min.js";
// import "../src/assets/lib/tempusdominus/js/moment-timezone.min.js";
// import "../src/assets/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js";

// // Import Main JS
// import "../src/assets/js/main.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
