import { Toaster } from "react-hot-toast";

import MainLayout from "./layouts/MainLayout";
import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <MainLayout>
        <AppRouter />
      </MainLayout>
    </>
  );
}