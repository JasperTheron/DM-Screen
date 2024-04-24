import { Outlet } from "react-router-dom";
import '../styles/create-page.css'
import Sidebar from "../layout/SideBar";

export default function Create(){
    return(
        <div className="create">
            <Sidebar />
            <div className="create--main--content">
                <Outlet />
            </div>
        </div>

    )
}