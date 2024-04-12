import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Container, LogoutBtn, ThemeBtn } from "..";
import { selectSignedIn } from "../../features/authSlice";
import { Logo } from "..";

function Header() {

  const isSignedIn = useSelector(selectSignedIn)
  const menuLinks = [
    {
      path: '/',
      label: 'Home',
      status: true
    },
    {
      path: '/blogs',
      label: 'Blogs',
      status: isSignedIn
    },
    {
      path: '/create',
      label: 'Create',
      status: isSignedIn
    }
  ]
  const profileLinks = [
    {
      path: '/register',
      label: 'Register',
      status: !isSignedIn
    },
    {
      path: '/login',
      label: 'Login',
      status: !isSignedIn
    },
    {
      path: '',
      label: 'Logout',
      status: isSignedIn
    },
  ]

  return (
    <Container flexBox flexProp="!justify-end !flex-row !gap-0"
      bgColor="bg-white dark:bg-neutral-800"
      className="sticky top-0 left-0 z-10 bg-transparent">
      <Container flexBox flexProp="!justify-between !flex-row" className="m-3">
        <Container flexBox flexProp="!flex-row !justify-start">
          <Container className="text-xl font-semibold dark:text-neutral-300 flex-1">
            <NavLink to={'/'}>
              <Logo />
            </NavLink>
          </Container>
          <Container flexBox flexProp="!flex-row !justify-start">
            {menuLinks.map((link, idx) => (
              link.status &&
              <p key={idx}>
                <NavLink to={link.path}
                  className={({ isActive }) => isActive ? 'text-fuchsia-500' :
                    'text-neutral-800 dark:text-neutral-300'} >
                  {link.label}
                </NavLink>
              </p>
            ))}
          </Container>
        </Container>

        <Container variant="fit">
          <Container flexBox flexProp="!flex-row !justify-start">
            {profileLinks.map((link, idx) => (
              link.status &&
              <p key={idx}>
                <NavLink to={link.path}
                  className={({ isActive }) => isActive ? 'text-fuchsia-500' :
                    'text-neutral-800 dark:text-neutral-300'}>
                  {link.label === 'Logout' ?
                    <LogoutBtn label={link.label} /> : link.label}
                </NavLink>
              </p>
            ))}
          </Container>
        </Container>
      </Container>

      <ThemeBtn />
    </Container>
  );
}

export default Header;