import { Link } from "react-router-dom"


const AdminAdministrators = () => {
  return (
	<div>
            <div className="flex justify-between w-full border-b">
                <h1>All Administrators</h1>
                <Link to="/dashboard/administrators/add">Add</Link>
            </div>
           
        </div>
  )
}

export default AdminAdministrators