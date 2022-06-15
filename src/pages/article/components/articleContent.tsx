import { NextPage } from 'next'
import MDEditor from "md-editor-rt"
import { useGetTheme } from 'hooks/useTheme';

const ArticleContent: NextPage<{ content: string,status:string }> = ({content,status}) => {
  const theme = useGetTheme()

  return (
    <div
      className="absolute top-[430px] left-2 w-[calc(100vw-30px)] text-base duration-1000"
      style={status === 'in' ? { top: '100vh' } : {}}
    >
      <MDEditor
        theme={theme === 'THEME_DARK' ? 'dark' : 'light'}
        previewTheme="vuepress"
        modelValue={content}
        previewOnly={true}
      />
  </div>)
}

export default ArticleContent
