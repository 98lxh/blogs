import { Fragment } from "react"
import Editor from "components/editor"
import { usePermission } from "hooks/usePermission"
import Head from "components/head"

const NewEditor = () => {
  usePermission()

  return (
    <Fragment>
      <Head
        title="写文章"
      />
      <Editor />
    </Fragment>
  )
}

NewEditor.noLayout = true

export default NewEditor
