import { Header, Container, ErrorCard } from "../components";
import { Link } from "react-router-dom";

function Error() {
  return (
    <>
      <Container bgColor="bg-neutral-300 dark:bg-neutral-700" flexBox
        className="h-screen">
        <ErrorCard title="404" description="ERROR! Page Not Found!" />
      </Container>
    </>
  );
}

export default Error;