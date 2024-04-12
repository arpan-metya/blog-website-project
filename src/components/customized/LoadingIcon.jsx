import Container from "../blocks/Container";

function LoadingIcon({
  iconColor = "#cf35de"
}) {
  return (
    <Container bgColor="bg-neutral-300 dark:bg-neutral-700" flexBox className="flex-1">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="animate-spin w-14 h-14">
        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.8273 3 17.35 4.30367 19 6.34267"
          stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </Container>
  );
}

export default LoadingIcon;