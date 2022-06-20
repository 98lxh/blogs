import { AddOne } from "@icon-park/react"
import Button from "libs/button"
import { useRouter } from "next/router"

const HeaderCreate = () => {
  const { push } = useRouter()
  return (
    <Button
      className="px-1 mr-1"
      onClick={()=>push('/editor/new')}
      icon={<AddOne />}
    >
      <p className="ml-0.5">写文章</p>
    </Button>
  )
}

export default HeaderCreate
