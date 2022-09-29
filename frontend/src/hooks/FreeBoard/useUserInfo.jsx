import { useSelector } from "react-redux";

// get and handle Administrator info
export function useUserInfo() {
  const login_info = useSelector((store) => store.account);
  const isAdmin = login_info.admin || false;
  const userId = login_info.userId || -2;

  return [userId, isAdmin];
}
