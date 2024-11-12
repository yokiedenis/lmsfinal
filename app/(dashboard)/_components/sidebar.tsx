import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar =()=>{
    return(
        <div className="h-full border-r flex flex-col overflow-y-auto bg-[#3b2f85] shadow-sm">
            <div className="p-6 bg-white">
            <div className="popping-logo"> 
             <Logo/> 
             </div>  
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes/>
            </div>
             
        </div>
    )
}