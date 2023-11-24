import { useAuth } from "../../hooks/useAuth";
import style from "./avatar.module.scss";

export const Avatar = () => {
  const { user, logout, isLoggedIn } = useAuth();
  const avatarBaseUrl = "https://api.dicebear.com/7.x/big-smile/svg?seed=";
  return (
    <>
      {isLoggedIn() && (
        <div className={style.avatar}>
          <div className={style.user}>
            <img src={avatarBaseUrl + user?.username} />
            <p>{user?.username}</p>
          </div>
          <button onClick={logout}>Log out</button>
        </div>
      )}
    </>
  );
};
