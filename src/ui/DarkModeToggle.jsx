import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;

/* khi click vào button Dark Mode ta muốn nó tạo effect cho toàn bộ app
ex: dổi màu nền, màu chữ, đổi logo....
        ==> phải tạo 1 global state ==> tạo ContextApi (DarkModeContext.jsx) là phù hop nhất vì nó sẽ ko liên quan gì đến React Query
                                                                        khi gọi Rreatc Query tai các componentn ko ảnh hưởng đến Context Api tạo cho DarkMode
*/
