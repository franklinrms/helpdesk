import { ElementType } from 'react'

interface InputIconProps {
  icon: ElementType
}

export default function InputIcon({ icon: Icon }: InputIconProps) {
  return <Icon className="h-6 w-6 text-inherit" />
}
