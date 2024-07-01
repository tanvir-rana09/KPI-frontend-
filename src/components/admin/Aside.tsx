import { useParams } from "react-router-dom"

const Aside = () => {
  const {item} = useParams()
  return (
    <div>
      {item}
    </div>
  )
}

export default Aside