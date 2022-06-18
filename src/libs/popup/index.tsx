import { NextPage } from "next"
import { Fragment, ReactNode} from "react"
import ReactDOM from "react-dom"
import { CSSTransition } from "react-transition-group"

interface PopupProps {
  children: ReactNode,
  visible: boolean,
  onClose:() => void
}

const Popup: NextPage<PopupProps> = ({ children, visible, onClose }) => {
  return ReactDOM.createPortal(
    <Fragment>
     <CSSTransition
        in={visible}
        classNames="fade"
        timeout={300}
        unmountOnExit={true}
      >
        <div
          className="w-screen h-screen bg-zinc-600/80 z-40 fixed top-0 right-0"
          onClick={() => onClose() }
        />
      </CSSTransition>
      <CSSTransition
        in={visible}
        classNames="popup-down-up"
        timeout={400}
        unmountOnExit={true}
      >
        <div className="w-screen bg-white z-50 fixed bottom-0 rounded-t-sm dark:bg-zinc-800">
          {children}
        </div>
      </CSSTransition>
    </Fragment>,
    document.body
  )
}

export default Popup
