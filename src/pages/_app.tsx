import { NextPage } from 'next'
import { Provider } from 'react-redux'
import { store } from 'store'
import { authActions } from 'store/slices/auth.slice'
import { useREM } from 'hooks/useREM'
import { useIsMobile } from 'hooks/useIsMobile'
import AppInitialization from 'components/appInitialization'
import Layout from 'layout'
import "styles/index.scss"

interface AppProps {
  initialValue: Record<any, any>,
  Component: NextPage,
  pageProps: any
}

function MyApp({ initialValue, Component, pageProps }: AppProps) {
  useBootstarp(initialValue.userInfo)
  return (
    <Provider store={store}>
      <AppInitialization>
        {
          (Component as any).noLayout
            ? <Component {...pageProps} />
            : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )
        }
      </AppInitialization>
    </Provider>
  )
}

MyApp.getInitialProps = async ({ ctx }: { ctx: any }) => {
  const { userId, nickname, avatar } = ctx?.req?.cookies || {};
  return {
    initialValue: {
      userInfo: {
        id: userId,
        nickname,
        avatar
      }
    }
  }
}

const useBootstarp = (userInfo: any) => {
  //区别移动端pc端
  useIsMobile()
  //rem适配
  useREM()
  //初始化用户数据
  store.dispatch(authActions.setUser(userInfo))
}


export default MyApp
