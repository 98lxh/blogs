import { useRouter } from "next/router"
import Editor from "components/editor"
const UpdateEditor = () => { 
  const router = useRouter()
  const { id } = router.query

  return (
   <Editor id={Number(id)} />
  )
}

UpdateEditor.noLayout = true

export default UpdateEditor
