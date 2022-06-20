import { useRouter } from "next/router"
import { FC, HTMLAttributes, ReactNode } from "react"

const TriggerItem: FC<{ icon: ReactNode, iconClass: string, textClass?: string, to?: string } & HTMLAttributes<HTMLDivElement>> = ({ 
  icon,
  iconClass,
  textClass='text-zinc-900 dark:zinc-200',
  to,
  children,
  ...attrs
}) => {
  const { push} = useRouter()

  return (
    <div
      className="w-6 flex flex-col items-center justify-center"
      onClick={() => to && push(to)}
      {...attrs}
    >
      <div className={`${iconClass} w-2 h-2`}>
        {icon}
      </div>

      <p className={`text-sm mt-0.5 ${textClass}`}>
        {children}
      </p>
    </div>
  )
}

export default TriggerItem
