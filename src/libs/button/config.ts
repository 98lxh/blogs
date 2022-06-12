export const MapTypeToClass = {
  primary: 'text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-900 dark:bg-zinc-900 dark:hover-zinc-700 dark:active:zinc-700',
  main: 'text-white bg-main hover:bg-hover-main active:bg-main',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700'
}

export const MapSizeToClass = {
  default: {
    button: 'h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-6 h-3 text-sm',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  },
} as any
