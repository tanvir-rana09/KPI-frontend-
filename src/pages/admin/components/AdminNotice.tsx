import { Link } from "react-router-dom"

const AdminNotice = () => {
  return (
	<div>
            <div className="flex justify-between w-full border-b">
                <h1>All Notice</h1>
                <Link to="/dashboard/photos/add">Add</Link>
            </div>
           
        </div>
  )
}

export default AdminNotice