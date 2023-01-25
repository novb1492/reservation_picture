import {Outlet} from "react-router-dom";
import FooterCompo from "./FooterCompo";
import HeaderCompo from "./HeaderCompo";

function LayoutCompo() {

    return (
        <div>
            <HeaderCompo/>
            <Outlet/>
            <FooterCompo/>
        </div>
    )
}
export default LayoutCompo;