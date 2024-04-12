import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/authSlice';

function LogoutBtn({ label }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    authService.logoutUser()
      .then(() => {
        dispatch(logout())
      })
      .then(() => {
        navigate('/')
      })
  }

  return (
    <button onClick={handleClick}
      className='text-neutral-800 dark:text-neutral-300'>
      {label}
    </button>
  );
}

export default LogoutBtn;