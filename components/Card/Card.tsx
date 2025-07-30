import { CardProps } from "@/types"

export default function Card({ children, classes }: CardProps) {
  return (
    <div className={`liquid-glass ${ classes }`}>
      { children }
    </div>
  )
}