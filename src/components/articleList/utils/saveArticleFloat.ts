import { MutableRefObject } from 'react';
import { store } from 'store';
import { floatActions } from 'store/slices/float.slice';
export const saveArticleFloat = ({
  imageRef,
  titleRef,
  authorRef
}: {
  imageRef: MutableRefObject<HTMLImageElement | null>,
  titleRef: MutableRefObject<HTMLDivElement | null>,
  authorRef: MutableRefObject<HTMLDivElement | null>,
}) => {
  const coverRect = imageRef.current!.getBoundingClientRect()
  const titleReat = titleRef.current!.getBoundingClientRect()
  const authorRect = authorRef.current!.getBoundingClientRect()


  store.dispatch(floatActions.setArticleFloat({
    cover: {
      inStyle: { top: coverRect.top + 'px', left: coverRect.left + 'px', width: coverRect.width + 'px', height: coverRect + 'px' },
    },
    title: {
      inStyle: { top: titleReat.top + 'px', left: titleReat.left + 'px' },
    },
    author: {
      inStyle: { top: authorRect.top + 'px', left: authorRect.left + 'px', width: '20px', height: '20px' },
    },
  }))
}
