import Container from "../blocks/Container";
import { NavLink } from "react-router-dom";
import { Logo } from "..";

function Footer() {
  return (
    <Container flexBox flexProp="!flex-row !justify-start"
      bgColor="dark:bg-neutral-800"
      className="relative bottom-0 left-0 p-3 bg-transparent">

      <Container className="flex-1 text-xl font-semibold text-neutal-800 dark:text-neutral-300">
        <NavLink to={'/'}>
          <Logo />
        </NavLink>
      </Container>

      <Container>
        <p className="text-right text-sm dark:text-neutral-400">
          @copyright
        </p>
      </Container>

    </Container>
  );
}

export default Footer;