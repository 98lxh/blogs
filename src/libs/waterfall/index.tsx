import { NextPage } from "next"
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { buildColumnHeightRecord, getAllImg, getImgElemements, getItemLeft, getItemTop, getMaxHeight, getMinHeightColumn, mapDataSourceToStyle, onComplateImgs } from "./utils"

interface WaterfallProps {
  dataSource: any[]
  nodeKey?: string
  colunm?: number
  colunmSpacing?: number
  rowSpacing?: number
  picturePreReading?: boolean
  // eslint-disable-next-line no-unused-vars
  renderItem: (item: any, columnWidth: number, index: number) => React.ReactNode
}

const Waterfall: NextPage<WaterfallProps> = ({
  colunm = 2,
  colunmSpacing = 20,
  rowSpacing = 20,
  picturePreReading = true,
  renderItem,
  nodeKey,
  dataSource
}) => {
  //容器
  const containerRef = useRef<HTMLDivElement | null>(null)
  //每列宽度
  const [columnWidth, setColumnWidth] = useState(0)
  //映射 处理每一项的定位样式
  const [mapStyle, setMapStyle] = useState(mapDataSourceToStyle(dataSource))
  //映射 记录每列高度
  const [columnHeightRecord, setColumnHeightRecord] = useState<Record<string, number>>(() => buildColumnHeightRecord(colunm))
  //容器总高度 = 最高的一列的高度
  const [conatinerHeight, setContainerHeight] = useState(0)
  //容器宽度
  const [containerWidth, setContainerWidth] = useState(0)
  //容器的左边距
  const [containerLeft, setContainerLeft] = useState(0)
  //item的高度集合
  let itemHeights:number[] = []
  //所有列间距的宽度
  const columnsSpacingWidthTotal = useMemo(() => colunmSpacing * (colunm - 1), [colunm, colunmSpacing])


  //计算列宽度 (容器宽度 - 所有列间距宽度) / 列数
  const calcColumnWidth = () => {
    const { paddingLeft, paddingRight } = getComputedStyle(containerRef.current!, null)
    //容器宽度
    const containerWidth = containerRef.current!.offsetWidth - (parseFloat(paddingLeft) + parseFloat(paddingRight))
    //左边距
    setContainerLeft(parseFloat(paddingLeft))
    setContainerWidth(containerWidth)
    //计算列宽
    setColumnWidth((containerWidth - columnsSpacingWidthTotal) / colunm)
  }

  //图片加载完成 需要预加载
  const waitImgComplate = async () => { 
    //拿到所有item
    const itemElements = [...containerRef.current!.getElementsByClassName('waterfall-item')] as HTMLElement[]
    //拿到所有img标签
    const imgElements = getImgElemements(itemElements)
    //获取所有 img 的图片的src
    const allImgs = getAllImg(imgElements)
    //等待图片加载完成
    await onComplateImgs(allImgs)
    itemElements.forEach(item => { 
      itemHeights.push(item.offsetHeight)
    })
    //渲染位置
    calcItemLocation()
  }

  //图片加载完成 不需要预加载
  const getItemHeights = () => { 
    //拿到所有item
    const itemElements = [...containerRef.current!.getElementsByClassName('waterfall-item')] as HTMLElement[]
    //item高度
    itemElements.forEach(item => { 
      itemHeights.push(item.offsetHeight)
    })
    calcItemLocation()
  }

  //计算渲染位置
  const calcItemLocation = () => {
    //遍历数据源
    let _mapStyle: Record<string, {
      left?: number
      top?:number
    }> = {}

    dataSource.forEach((_, index) => {
      //避免重复计算
      if (mapStyle[index]) return
      //指定列高度自增
      setColumnHeightRecord(preColRecord => {
        const minHeightColumn = getMinHeightColumn(preColRecord)
        _mapStyle[index] = {}
        _mapStyle[index].left = getItemLeft(preColRecord,colunmSpacing,containerLeft,columnWidth)
        _mapStyle[index].top = getItemTop(preColRecord)

        setMapStyle(_mapStyle)
        //容器高度
        setContainerHeight(getMaxHeight(preColRecord))

        return ({
          ...preColRecord,
          [minHeightColumn]:itemHeights[index] + columnHeightRecord[minHeightColumn]
        })
      })
    })
  }


  useEffect(() => {
    if (!containerRef.current || !containerRef.current.offsetWidth) return
    calcColumnWidth()
  }, [containerRef.current?.offsetWidth])

  useEffect(() => { 
    if (!containerRef.current?.children.length && !columnHeightRecord) return 
    picturePreReading ? waitImgComplate() : getItemHeights()
  },
    [containerRef.current?.children, picturePreReading, dataSource, columnHeightRecord]
  )

  return (
    <div
      className="relative"
      ref={containerRef}
      style={{ height: conatinerHeight + 'px' }}
    >
      {
        columnWidth && dataSource.length
          // 渲染数据
          ? (
            <Fragment>
              {
                dataSource.map((item, index) => (
                  <div
                    key={nodeKey ? item[nodeKey] : index}
                    className="waterfall-item absolute duration-300"
                    style={{
                      width: columnWidth + 'px',
                      left: mapStyle[index]?.left + 'px',
                      top: mapStyle[index]?.top + 'px',
                    }}
                  >
                    {renderItem && renderItem(item, columnWidth, index)}
                  </div>
                ))
              }
            </Fragment>
          )
          : '加载中...'
      }
    </div>
  )
}

export default Waterfall
