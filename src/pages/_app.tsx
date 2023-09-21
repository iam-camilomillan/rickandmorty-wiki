import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

/* Font import */
import { Poppins } from "next/font/google";

/* Font declarations */
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});

/* Components import */
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main
      className={`${poppins.variable} overflow-hidden bg-neutral-800 font-poppins text-white`}
    >
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
};

export default api.withTRPC(MyApp);
