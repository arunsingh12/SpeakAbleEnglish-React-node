import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const isAuthenticated  = useSelector((state) => state.students.isAuthenticated);

    useEffect(() => {
        !isAuthenticated && navigate("/");
    }, [isAuthenticated,navigate]);

    return isAuthenticated && props.children;
};

export default ProtectedRoute;