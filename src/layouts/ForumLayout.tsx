import { Outlet } from "react-router-dom";
import ForumHeader from "../components/Forum/ForumHeader";

const ForumLayout = () => (
    <div>
        <ForumHeader />
        <Outlet />
    </div>
);

export default ForumLayout;
