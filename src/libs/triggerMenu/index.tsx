import { FC, HTMLAttributes } from "react";
import TriggerItem from "./item"

const TriggerMenu: FC<HTMLAttributes<HTMLDivElement>> = ({ children,...attrs}) => { 
  return (
    <div
      className="max-w-[286px] bg-white dark:bg-zinc-800 rounded-full shadow flex items-center px-2 py-1 fixed bottom-2 m-auto left-0 right-0 justify-between"
      {...attrs}
    >
      {children}
    </div>
  )
}

export { 
  TriggerMenu,
  TriggerItem
}
