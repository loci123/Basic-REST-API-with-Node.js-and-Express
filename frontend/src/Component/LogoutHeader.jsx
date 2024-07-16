import { FaSignOutAlt } from "react-icons/fa";
import { Link} from 'react-router-dom'

function LogoutHeader() {
 const RemoveToken=()=>{
  localStorage.clear();
 }
  return (
    <header className='header'>
    <div className='logo'>
     
    </div>
    <ul>
          <li>
            <Link to='/login'  onClick={RemoveToken}>
              <FaSignOutAlt />  Logout
            </Link>
          </li>
    </ul>
  </header>
  )
}

export default LogoutHeader