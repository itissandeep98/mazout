import { ToastContainer } from "react-toastify";
import LayoutWrapper from "../layout/LayoutWrapper";
import Meta from "../layout/Meta";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<div className=" h-screen items-center flex px-3 lg:px-40 bg-gradient ">
			<Meta />
			<LayoutWrapper {...pageProps}>
				<Component {...pageProps} />
			</LayoutWrapper>
			<ToastContainer />
		</div>
	);
}

export default MyApp;
