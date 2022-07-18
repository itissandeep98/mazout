import { ToastContainer } from "react-toastify";
import LayoutWrapper from "../layout/LayoutWrapper";
import Meta from "../layout/Meta";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<div className="text-white h-screen items-center flex px-3 lg:px-40 bg-black ">
			<Meta />
			<LayoutWrapper {...pageProps}>
				<Component {...pageProps} />
			</LayoutWrapper>
			<ToastContainer />
		</div>
	);
}

export default MyApp;
