import { useParams } from "react-router-dom"

const Aside = () => {
  const {item} = useParams()
  console.log(item);
  if (item==='students') {
    return 'student'
  }
  return (
    <div>
      {item}
    </div>
  )
}

export default Aside