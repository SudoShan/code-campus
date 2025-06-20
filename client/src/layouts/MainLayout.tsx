import { Outlet } from "react-router-dom";
import Navbar from "../components/MainNavBar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
