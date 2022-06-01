import { NextPage } from 'next'
import { Provider } from 'react-redux'
import { store } from 'store'
import { authActions } from 'store/auth.slice'
import { isEmptyObject } from 'utils/isEmptyObject'
import "styles/index.scss"
import { useRem } from 'hooks/useRem'

interface AppProps {
  initialValue: Record<any, any>,
  Component: NextPage,
  pageProps: any
}


function MyApp({ initialValue, Component, pageProps }: AppProps) {

  useRem()
  bootstrapUser(initialValue.userInfo)
  
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}



MyApp.getInitialProps = async ({ ctx }: { ctx: any }) => {
  const { userId, nickname, avatar } = ctx?.req?.cookies || {};

  return {
    initialValue: {
      userInfo: {
        userId,
        nickname,
        avatar
      }
    }
  }
}

//初始化用户信息
const bootstrapUser = (userInfo: any) => {
  if(isEmptyObject(userInfo)) return
  store.dispatch(authActions.setUser(userInfo))
}

export default MyApp
