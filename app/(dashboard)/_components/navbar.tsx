import { NavbarRoutes } from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";

const NavBar = () => {
    return ( 
    <div className="p-4   h-full flex items-center bg-grey shadow-sm">
     <MobileSidebar/>
         <NavbarRoutes/>
        </div>
     );
}
 
export default NavBar;