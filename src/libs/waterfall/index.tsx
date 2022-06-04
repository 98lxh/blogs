import { NextPage } from "next"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { buildColumnHeightRecord, getAllImg, getImgElemements, getMinHeightColumn, mapDataSourceToStyle, onComplateImgs, getMinHeight, getMaxHeight, onGetItemHeights } from "./utils"

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
  //容器总高度 = 最高的一列的高度
  const [conatinerHeight, setContainerHeight] = useState(0)
  //容器的左边距
  const [containerLeft, setContainerLeft] = useState(0)
  //所有列间距的宽度
  const columnsSpacingWidthTotal = useMemo(() => colunmSpacing * (colunm - 1), [colunm, colunmSpacing])
  //记录元素的高度
  let itemHeights: number[] = []
  //映射 记录每列高度= buildColumnHeightRecord(colunm)
  let columnHeightRecord: Record<string,number> = {};

  //计算列宽度 (容器宽度 - 所有列间距宽度) / 列数
  const calcColumnWidth = () => {
    const { paddingLeft, paddingRight } = getComputedStyle(containerRef.current!, null)
    //容器宽度
    const containerWidth = containerRef.current!.offsetWidth - (parseFloat(paddingLeft) + parseFloat(paddingRight))
    //左边距
    setContainerLeft(parseFloat(paddingLeft))
    //计算列宽
    const columnWidth = (containerWidth - columnsSpacingWidthTotal) / colunm
    setColumnWidth(columnWidth)
    //定位所有子元素
    if (containerRef.current!.children.length) waitImgComplate(columnWidth)
  }

  //图片加载完成 需要预加载
  const waitImgComplate = async (columnWidth: number) => {
    columnHeightRecord = buildColumnHeightRecord(colunm)
    //拿到所有item
    const itemElements = [...containerRef.current!.children] as HTMLElement[]
    //预加载
    if (picturePreReading) {
      //拿到所有img标签
      const imgElements = getImgElemements(itemElements)
      //获取所有 img 的图片的src
      const allImgs = getAllImg(imgElements)
      //等待图片加载完成
      await onComplateImgs(allImgs)
    }
    itemHeights = await onGetItemHeights(itemElements)
    //渲染位置
    calcItemLocation(columnWidth)
  }

  //计算渲染位置
  const calcItemLocation = (columnWidth: number) => {
    //遍历数据源
    let _mapStyle: Record<string, {
      left?: number
      top?: number
    }> = {}

    dataSource.forEach((_, index) => {
      //指定列高度自增
      _mapStyle[index] = {}
      _mapStyle[index].left = getItemLeft(columnWidth)
      _mapStyle[index].top = getItemTop()

      setMapStyle(_mapStyle)
      increasingHeight(index)
    })

    setContainerHeight(getMaxHeight(columnHeightRecord))
  }

  const increasingHeight = (index: number) => {
    const minHeightColumn = getMinHeightColumn(columnHeightRecord)
    columnHeightRecord[minHeightColumn] += (itemHeights[index] + rowSpacing)
  }

  //返回下一个item的left
  const getItemLeft = (columnWidth: number) => {
    //拿到最小宽度的列
    const column = getMinHeightColumn(columnHeightRecord) as unknown as number
    return column * (columnWidth + colunmSpacing) + containerLeft
  }

  //返回下一个item的top
  const getItemTop = () => {
    return getMinHeight(columnHeightRecord)
  }

  useEffect(() => {
    calcColumnWidth()
  },
    [
      dataSource,
      containerRef.current?.offsetWidth,
      colunm
    ]
  )

  return (
    <div
      className="relative"
      ref={containerRef}
      style={{ height: conatinerHeight + 'px' }}
    >
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
    </div>
  )
}

export default Waterfall
