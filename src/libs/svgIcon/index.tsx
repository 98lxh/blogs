import { NextPage } from "next"

interface SvgIconProps { 
  name: string
  color?: string
  fillClass?:string //tailwind指定svg类名
}

const SvgIcon: NextPage<SvgIconProps> = ({ name, color, fillClass }) => { 

  return (
    <svg aria-hidden={true} className={fillClass}>
      <use
        xlinkHref={`./assets/icons/${name}.svg`}
        fill={ color}
      />
    </svg>
  )
}

export default SvgIcon
