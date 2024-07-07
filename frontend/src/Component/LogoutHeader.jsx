import { FaSignOutAlt } from "react-icons/fa";
import { Link} from 'react-router-dom'

function LogoutHeader() {
 
  return (
    <header className='header'>
    <div className='logo'>
     
    </div>
    <ul>
          <li>
            <Link to='/login'  >
              <FaSignOutAlt />  Logout
            </Link>
          </li>
    </ul>
  </header>
  )
}

export default LogoutHeader