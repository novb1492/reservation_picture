import {Outlet} from "react-router-dom";
import HeaderCompo from "./HeaderCompo";

function LayoutCompo() {

    return (
        <div>
            <HeaderCompo/>
            <Outlet/>
        </div>
    )
}
export default LayoutCompo;