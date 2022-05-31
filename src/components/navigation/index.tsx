import { useIsMobile } from "hooks/useIsMobile"
import { NextPage } from "next"
import MobileNavgation from "./components/mobile"
import PCNavgation from "./components/pc"
import { useCategorys } from "./hooks/useCategorys"

const Navigation: NextPage = () => {
  const isMobile = useIsMobile()
  const { categorys } = useCategorys()
  
  return (
    isMobile
     ? <MobileNavgation categorys={categorys} />
     : <PCNavgation />
  )
}

export default Navigation
