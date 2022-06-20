import { FC, useState } from 'react';
import MDEditor from "md-editor-rt"
import { useSelector } from "react-redux";
import { useMountRef } from 'hooks/useMount';
import { selectCurrentTheme } from "store/slices/system.slice";
import Button from 'libs/button';
import { Triangle } from '@icon-park/react';
import Popup from 'libs/popup';

const ArticleContent: FC<{ content: string }> = ({ content }) => {
  const theme = useSelector(selectCurrentTheme)
  const mountRef = useMountRef()
  const [catalogVisible, setCatalogVisible] = useState(false)

  return (
    <div className="absolute top-[430px] left-2 w-[calc(100vw-30px)] text-base lg:flex" >
      <MDEditor
        editorId="article"
        theme={theme === 'THEME_DARK' ? 'dark' : 'light'}
        previewTheme="vuepress"
        modelValue={content}
        previewOnly={true}
      />

      {mountRef.current && (
        <Popup
          visible={catalogVisible}
          onClose={() => setCatalogVisible(false)}
        >
          <p className='text-main text-base pl-[10px] py-1'>目录</p>
          <MDEditor.MdCatalog
            editorId='article'
            className='text-sm pb-1'
            scrollElement="#scroll-wrapper"
            theme={theme === 'THEME_DARK' ? 'dark' : 'light'
            }
          />
        </Popup>
      )}

      <div
        className={`fixed none right-2 bottom-2 z-50 duration-200`}
      >
        <Button
          type="info"
          icon={<Triangle className='text-main' />}
          onClick={() => setCatalogVisible(true)}
        ></Button>

      </div>
    </div>
  )
}

export default ArticleContent
