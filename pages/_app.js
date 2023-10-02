import "@/styles/globals.css";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Montserrat } from "next/font/google";
import LoadingScreen from "@/components/LoadingScreen";

const persistor = persistStore(store);
const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "Courier New"],
});




export default function App({ Component, pageProps }) {
  return (
    <PersistGate  loading={<LoadingScreen />} persistor={persistor}>
      <Provider store={store}>
        <main className={montserrat.className}>
          <Component {...pageProps} />
        </main>
      </Provider>
    </PersistGate>
  );
}
