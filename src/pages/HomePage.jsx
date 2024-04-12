import { Button, Container } from "../components";
import HomeImage from "../assets/images/home-default.jpg"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSignedIn } from "../features/authSlice";

function HomePage() {
  const isSignedIn = useSelector(selectSignedIn)
  const title = "BLOGS"
  const subtitle = "Welcome to Blogs"
  const description = "A simple Website for Creating and Managing Blogs"


  return (
    <Container
      style={{ height: 'calc(100vh - 6.5rem)' }} flexBox
      className="relative bg-gradient-to-tr from-blue-800/50 to-orange-500/50">

      <img src={HomeImage} alt=""
        className="w-full h-full object-cover absolute -z-1 mix-blend-overlay" />
      <Container width="w-full" height="h-full" flexBox
        className="rounded-xl p-10 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-50">{title}</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-100">{subtitle}</h2>
        <p className="text-xl md:text-xl italic text-center text-neutral-200">{description}</p>

        {isSignedIn ?
          <Link to="/blogs">
            <Button label="Blogs" className="text-md md:text-xl px-6 pb-3 mt-2 transition hover:shadow-xl rounded-xl" bgColor="bg-red-500/80" />
          </Link> :
          <Container flexBox flexProp="sm:flex-row !gap-5" className="mt-2">
            <Link to="/register" className="text-center inline-block">
              <Button label="Signup" className="text-md md:text-xl px-8 pb-3 transition hover:shadow-xl rounded-xl" bgColor="bg-red-500/80" />
            </Link>
            <Link to="/login" className="text-center inline-block">
              <Button label="Login" className="text-md md:text-xl px-8 pb-3 transition hover:shadow-xl rounded-xl" bgColor="bg-red-500/80" />
            </Link>
          </Container>
        }
      </Container>

    </Container>
  );
}

export default HomePage;