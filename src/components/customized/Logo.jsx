import Container from "../blocks/Container";
import LogoIcon from "../../assets/logos/blog.svg"

function Logo() {
  return (
    <Container className="w-6 h-5 px-2 my-1"
      flexBox flexProp="!flex-row !gap-1">
      <img src={LogoIcon} alt="Logo" className="w-full h-full" />
      <p>BLOGS</p>
    </Container>
  );
}

export default Logo;