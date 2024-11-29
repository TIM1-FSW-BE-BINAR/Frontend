import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";

const Protected = ({ children, roles }) => {
  const navigate = useNavigate();

  const { token, users } = useSelector((state) => state.auth);

  // if token not found It will redirect it to login
  if (!token) {
    navigate({ to: "/login" });
    return;
  }

  if (token && users && roles.length > 0) {
    const isCanAccess = roles.includes(users?.role);
    if (!isCanAccess) {
      navigate({ to: "/" });
      return;
    }
  }

  return children;
};

export default Protected;
