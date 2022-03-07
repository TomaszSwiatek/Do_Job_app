// styles
import './Navbar.css'
// assets
import Temple from './../assets/temple.svg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

function Navbar() {

    const { logout, isPending } = useLogout()

    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={Temple} alt="DoJob logo" />
                    <span>the Dojo</span>
                </li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li>
                    {
                        !isPending &&
                        <button className='btn' onClick={logout}>Logout</button>
                    }
                    {
                        isPending &&
                        <button className='btn' disabled>Logging out..</button>
                    }
                </li>
            </ul>
        </div>
    )
}

export default Navbar