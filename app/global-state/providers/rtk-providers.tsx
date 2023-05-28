import React from 'react'
import { Provider } from 'react-redux'

import { store } from 'app/global-state/store'

export default function RTKProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <Provider store={store}>{children}</Provider>
}
