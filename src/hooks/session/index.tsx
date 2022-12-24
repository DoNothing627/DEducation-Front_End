import {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { checkUserLogin, redirectToLogin } from "@app/services/auth";
import { myProfile, MyProfile } from "@app/api/user/my-profile";
import React from "react";
import { handleError } from "@app/dekits/error-handler";

interface SessionContextValues {
  isLoggedIn: boolean;
  userInfo?: MyProfile;
  logout: () => void;
  syncDataWithServer: (isForceUpdate?: boolean) => void;
}

const SessionContext = React.createContext<SessionContextValues>(
  {} as SessionContextValues
);

export interface UserSession {
  isLoggedIn: boolean;
  userInfo?: MyProfile;
}

export function useSession() {
  return useContext(SessionContext);
}

type SessionContainerProps = PropsWithChildren<{
  userProfile?: MyProfile;
}>;

export function SessionContainer(props: SessionContainerProps) {
  const [isLoggedIn, setIsloggedIn] = useState(!!props.userProfile);
  const [userInfo, setUserInfo] = useState<MyProfile | undefined>(
    props.userProfile
  );

  const logout = useCallback(() => {
    redirectToLogin();
  }, []);

  const getUserInfo = useCallback(
    (isForceUpdate = false) => {
      if (userInfo && !isForceUpdate) return;

      myProfile().subscribe({
        next: (res: any) => setUserInfo(res.data),
        error: handleError(),
      });
    },
    [userInfo]
  );

  useEffect(() => {
    const newLoggedIn = checkUserLogin();
    setIsloggedIn(newLoggedIn);

    newLoggedIn && getUserInfo();
  }, [getUserInfo, isLoggedIn, logout, userInfo]);

  const syncDataWithServer = useCallback(
    (isForceUpdate = false) => {
      checkUserLogin() && getUserInfo(isForceUpdate);
    },
    [getUserInfo]
  );

  return (
    <SessionContext.Provider
      value={{
        isLoggedIn,
        userInfo,
        logout,
        syncDataWithServer,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}
