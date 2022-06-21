import { NextPage } from 'next'
import { Provider } from 'react-redux'
import { store } from 'store'
import { useREM } from 'hooks/useREM'
import { useIsMobile } from 'hooks/useIsMobile'
import { useUserInfo } from 'hooks/useUserInfo'
import AppInitialization from 'components/appInitialization'
import Layout from 'layout'
import "styles/index.scss"

interface AppProps {
  Component: NextPage,
  pageProps: any
}

function MyApp({ Component, pageProps }: AppProps) {
  useBootstarp()

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

const useBootstarp = () => {
  //区别移动端pc端
  useIsMobile()
  //rem适配
  useREM()
  //初始化用户数据
  useUserInfo()
}


export default MyApp
