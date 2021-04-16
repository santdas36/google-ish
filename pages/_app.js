import "../styles/globals.css";
import "../styles/Header.css";
import "../styles/Sidebar.css";
import "../styles/Main.css";
import "../styles/Apps.css";
import "../styles/Footer.css";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import Router from "next/router";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
