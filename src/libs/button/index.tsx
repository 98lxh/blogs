import React, { HTMLAttributes, MouseEventHandler } from "react";
import { NextPage } from "next";
import { Loading } from "@icon-park/react"
import { MapSizeToClass, MapTypeToClass } from "./config";

interface ButtonProps {
  type?: 'primary' | 'main' | 'info'
  size?: 'default' | 'small'
  loading?: boolean
  animation?: boolean
  icon?: React.ReactElement,
}

const Button: NextPage<ButtonProps & HTMLAttributes<HTMLButtonElement>> = (
  {
    type = 'main',
    size = 'default',
    animation = true,
    className,
    loading,
    icon,
    ...restProps
  }
) => {
  const sizeClass = icon ? MapSizeToClass['icon-' + size].button : MapSizeToClass[size].button
  const typeClass = MapTypeToClass[type]

  const Icon = icon
    ? React.cloneElement(icon, {
      className: MapSizeToClass['icon-' + size].icon,
    })
    : null

  const onButtonClick: MouseEventHandler<HTMLButtonElement> = (evt) => {
    if (loading || !restProps.onClick) return
    restProps.onClick(evt)
  }

  return (
    <button
      className={`text-sm text-center rounded-sm duration-150 justify-center items-center flex ${sizeClass} ${typeClass} ${animation && 'active:scale-105'} ${className}`}
      {...restProps}
      onClick={onButtonClick}
    >
      {loading && <Loading className="w-2 h-2 animate-spin mr-1" />}
      {Icon && Icon}
      {restProps.children}
    </button>
  )
}

export default Button
