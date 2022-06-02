import { NextPage } from 'next'
import { Provider } from 'react-redux'
import Layout from 'layout'
import { store } from 'store'
import { authActions } from 'store/auth.slice'
import { isEmptyObject } from 'utils/isEmptyObject'
import { useREM } from 'hooks/useREM'
import { useIsMobile } from 'hooks/useIsMobile'
import "styles/index.scss"
import "styles/transition.scss"

interface AppProps {
  initialValue: Record<any, any>,
  Component: NextPage,
  pageProps: any
}


function MyApp({ initialValue, Component, pageProps }: AppProps) {
  useBootstarp(initialValue.userInfo)
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
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

const useBootstarp = (userInfo:any) => { 
  //区别移动端pc端
  useIsMobile()
  //rem适配
  useREM()
  //初始化用户数据
  if(isEmptyObject(userInfo)) return
  store.dispatch(authActions.setUser(userInfo))
}

export default MyApp
