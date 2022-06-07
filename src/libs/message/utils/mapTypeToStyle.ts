// containerClass:'bg-wran-100 border-warn-200 hover:'
import { Check, Close, Caution } from "@icon-park/react"
export const MapTypeToStyle = {
  warning: {
    icon: Caution,
    iconColor: 'bg-warn-300',
  },
  error: {
    icon: Close,
    iconColor: 'bg-error-300',
  },
  success: {
    icon: Check,
    iconColor: 'bg-success-300',
  }
}
