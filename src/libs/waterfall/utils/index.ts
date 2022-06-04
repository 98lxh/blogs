// 从itemElment中抽离出img
export const getImgElemements = (itemElements: Element[]) => {
  const imgElements: HTMLImageElement[] = []
  itemElements.forEach(el => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}

//生成所有图片链接数组
export const getAllImg = (imgElements: HTMLImageElement[]) => imgElements.map(imgEl => imgEl.src)


//监听图片数组加载完成
type Img = {
  img: string
  index: number
}
export const onComplateImgs = (imgs: string[]) => {
  //promise结合
  const promiseAll: Promise<Img>[] = []
  //循环 imgs 构建promise数组
  imgs.forEach((img, index) => {
    const promise = new Promise<Img>((resolve) => {
      //处理img加载情况
      const image = new Image()
      image.src = img
      image.onload = () => {
        resolve({
          img,
          index
        })
      }
    })
    promiseAll.push(promise)
  })

  return Promise.all(promiseAll)
}

//返回列对象中最大高度
export const getMaxHeight = (columnHeightRecord: Record<string, number>) => {
  const columnHeights = Object.values(columnHeightRecord) as number[]
  return Math.max(...columnHeights)
}

//返回列高对象中最小的高度
export const getMinHeight = (columnHeightRecord: any) => {
  const columnHeights = Object.values(columnHeightRecord) as number[]
  return Math.min(...columnHeights)
}

//返回列高对象中最小高度所在列
export const getMinHeightColumn = (columnHeightRecord: Record<string, number>) => {
  //拿到最小高度
  const minHeight = getMinHeight(columnHeightRecord)
  return Object.keys(columnHeightRecord).find(key => columnHeightRecord[key] === minHeight)!
}

export const mapDataSourceToStyle = (dataSource: any[]) => {
  const style: any = {}
  dataSource.forEach((_, index) => {
    style[index] = {
      left: 0,
      top: 0
    }
  })
  return style
}

//初始化每列高度记录
export const buildColumnHeightRecord = (colunm: number) => {
  const record: Record<string, number> = {}
  //key所在列 val所在列的高度
  for (let i = 0; i < colunm; i++) {
    record[i] = 0
  }

  return record
}

let timer: any = 0
export const onGetItemHeights = (items: HTMLElement[]) => {
  if (timer) clearTimeout(timer)
  const itemsHeights: number[] = []
  return new Promise<number[]>(resolve => {
    timer = setTimeout(() => {
      items.forEach(el => itemsHeights.push(el.offsetHeight))
      resolve(itemsHeights)
    }, 100)
  })
}


