import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface UserType {
  userInfo: any;
  updateUserInfo: () => void;
}

const UserContext = createContext<UserType>({} as UserType);
UserContext.displayName = "UserContext";

export const useUserContext = () => useContext(UserContext);

export function UserWalletContainer(props: PropsWithChildren<React.ReactNode>) {
  const [userInfo, setUserInfo] = useState({
    networkId:
      typeof localStorage !== "undefined" && localStorage?.getItem("networkId"),
    wallet:
      typeof localStorage !== "undefined" && localStorage?.getItem("wallet"),
    account:
      typeof localStorage !== "undefined" &&
      localStorage?.getItem("connectedAccount"),
    balance:
      typeof localStorage !== "undefined" && localStorage?.getItem("balance"),
  });

  const updateUserInfo = () => {
    const newUserInfo = {
      networkId: localStorage.getItem("networkId"),
      wallet: localStorage.getItem("wallet"),
      account: localStorage.getItem("connectedAccount"),
      balance: localStorage.getItem("balance"),
    };

    setUserInfo(newUserInfo);
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        updateUserInfo,
      }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
