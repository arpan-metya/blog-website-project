import { Container } from "..";
import { Link } from "react-router-dom";

function ErrorCard({
  title = "ERROR",
  description = "Ooops! Sometheing Went Wrong!" }) {
  return (
    <Container bgColor="bg-neutral-300 dark:bg-neutral-700" flexBox className="flex-1">
      <p className="text-3xl sm:text-4xl md:text-6xl md:my-5 uppercase font-semibold text-red-500">
        {title}
      </p>
      <p className="text-xl sm:text-3xl md:text-5xl text-neutral-800 dark:text-neutral-300">
        {description}
      </p>
      <p className="text-lg sm:text-xl md:text-2xl md:mt-2">
        go back To --
        <Link to="/" className="text-blue-600 hover:animate-pulse">
          Home
        </Link>
        --
      </p>
    </Container>
  );
}

export default ErrorCard;