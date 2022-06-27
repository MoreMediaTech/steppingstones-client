import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { NotificationsProvider } from '@mantine/notifications'
import { store, wrapper } from 'app/store'
import 'react-quill/dist/quill.snow.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NotificationsProvider position="top-right">
        <Component {...pageProps} />
      </NotificationsProvider>
    </Provider>
  )
}

export default wrapper.withRedux(MyApp)
