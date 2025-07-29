import { ButtonProps } from "@/types"

export default function Button({ label, onClick, variant, classes }: ButtonProps) {
  return (
    <button
      className={`liquid-glass btn ${variant === "secondary" ? "btn-secondary" : "btn-primary"} ${ classes }`}
      onClick={ onClick }>
        { label }
      </button>
  )
}