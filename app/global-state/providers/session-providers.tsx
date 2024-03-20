"use client";

import { PropsWithChildren, createContext, useContext, useEffect } from "react";

// redux store (Model)
import { useAppDispatch, useAppSelector } from "../hooks";
import { userSelector, setSession } from "../features/user/userSlice";
import { useGetUserQuery } from "../features/user/usersApiSlice";
import { UserSchemaWithIdType } from "@models/User";

export const SessionContext = createContext<{
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserSchemaWithIdType | null;
} | null>(null);

export const SessionProvider = (props: PropsWithChildren) => {
  const { isAuthenticated } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data !== undefined) {
      dispatch(
        setSession({
          currentUser: data as UserSchemaWithIdType,
          isAuthenticated: !!data,
        }),
      );
    }
  }, [data]);

  return (
    <SessionContext.Provider
      value={{ isAuthenticated, user: data as UserSchemaWithIdType, isLoading }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return session;
};
