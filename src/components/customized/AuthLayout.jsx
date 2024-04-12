import { useSelector } from "react-redux";
import { selectSignedIn } from "../../features/authSlice";
import { useEffect, useState } from "react";
import { LoadingIcon } from "..";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication = false }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const authStatus = useSelector(selectSignedIn)

  useEffect(() => {
    if (!authStatus && authentication) {
      navigate('/login')
    } else if (authStatus && !authentication) {
      navigate('/')
    }
    setIsLoading(false)
  }, [authStatus, authentication, navigate])

  return (
    <>
      {isLoading ? <LoadingIcon /> : children}
    </>
  )
}

export default AuthLayout;