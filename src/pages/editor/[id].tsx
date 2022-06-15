import { useRouter } from "next/router"
import Editor from "components/editor"
import { usePermission } from "hooks/usePermission"
import { Fragment } from "react"
import Head from "next/head"

const UpdateEditor = () => {
  const router = useRouter()
  const { id } = router.query
  usePermission()

  return (
    <Fragment>
      <Head>
        <title>编辑文章</title>
      </Head>
      <Editor id={Number(id)} />
    </Fragment>
  )
}

UpdateEditor.noLayout = true

export default UpdateEditor
