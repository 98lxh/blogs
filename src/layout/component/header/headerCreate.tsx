import { AddOne } from "@icon-park/react"
import Button from "libs/button"
import Link from "next/link"

const HeaderCreate = () => {
  return (
    <Link
      href="/editor/new"
    >
      <Button
        className="px-1 mx-1"
        type="info"
        icon={<AddOne />}
      >
        <p className="ml-0.5">写文章</p>
      </Button>
    </Link>
  )
}

export default HeaderCreate
