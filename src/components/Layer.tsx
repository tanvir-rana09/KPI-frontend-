import { ReactNode } from "react"

const Layer = ({children}:{children:ReactNode}) => {
  return (
	<div
	className="w-full max-w-7xl px-2 mx-auto"
	>{children}</div>
  )
}

export default Layer