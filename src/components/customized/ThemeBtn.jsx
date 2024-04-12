import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from '../../features/themeSlice'

function ThemeBtn() {
  const darkMode = useSelector(state => state.theme.darkMode)
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(toggleDarkMode())
  }

  return (
    <button
      onClick={handleClick}
      className="my-2 px-2 border-l border-neutral-300 dark:border-neutral-700">
      <svg xmlns="http://www.w3.org/2000/svg" fill={darkMode ? 'yellow' : 'none'} viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor"
        className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    </button>
  );
}

export default ThemeBtn;