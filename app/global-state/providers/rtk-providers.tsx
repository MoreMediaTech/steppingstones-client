import React from "react";
import { Provider } from "react-redux";

import { store } from "app/global-state/store";
import { fetchPublicFeed } from "@app/global-state/features/content/contentSlice";

store.dispatch(fetchPublicFeed());

export default function RTKProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
