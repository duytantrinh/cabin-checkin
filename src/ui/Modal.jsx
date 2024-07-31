import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

//1. tạo Context APi
const ModalContext = createContext();

//2. tạo parent component - {children} : là Window and Open

function Modal({ children }) {
  // luôn có state
  const [openName, setOpenName] = useState("");

  // function để updating state => updating function
  const close = () => setOpenName("");
  const open = setOpenName;
  /* const open = setOpenName ===  function open(props truyên vào từ AddCabin) {
                                      return setOpenName(props truyên vào từ AddCabin);
                                    }
  */

  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

// 3. tạo children  component để thực hiện task
function OpenButton({ children, opens: openWindowName }) {
  // muốn dùng open trong parent cha thì destructuring {open} =  useContext(ModalContext);
  const { open } = useContext(ModalContext);

  // gọi function open từ Modal
  // cloneElement: add function open cho children ( children lúc này là Button)
  // ==> tạo onClick cho Button
  return cloneElement(children, { onClick: () => open(openWindowName) });
}

// lúc này khi click bào Button nó sẽ lấy text trong prop opens gán vào cho state: openName

// xuống Window sẽ check if props name của Window và openName trùng nhau thì mở đc Window
//                                                            khác nhau thì ko mở đc WIndow

function Window({ name, children }) {
  const { openName, close } = useContext(ModalContext);
  // có tác động /changing đến DOM => dùng useRef - 3 bước để dùng useRef()

  // detecting action click outside Window
  const ref = useOutsideClick(close);

  // check name gởi vào với name của current Window có trùng nhau hay ko
  if (name !== openName) return null;

  // khi prop open tại Open và name tại Window giống nhau thì mở Modal.Window
  return createPortal(
    <Overlay>
      {/* // 2 ref: gán ref cho DOM muốn dùng nó */}
      <StyledModal ref={ref}>
        {/* // gọi function close để set openName = "" => đóng Window */}
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {/* // gán type onCloseModal cho CreateCabinForm */}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body // Muốn Modal là direct child của body
  );
}

// 4. add child component as a properties to parent component
Modal.OpenButton = OpenButton;
Modal.Window = Window;

export default Modal;

/* =================== 4 bước tạo Compound Component Pattern
 1. tạo Context APi

 2. tạo parent component
        tạo state openName để so sánh
        tạo function close để đóng Modal.Window
        function open để mở Modal.Window    

 3. tạo children component để thực hiện task
    a. OpenButton 
        tạo Button và khi click Button thì gán prop lấy đc từ AddCabin vào cho state: OpenName 

    b. Window
        so sánh state: openName với props name nhận đc từ AddCabin
            ==> trùng nhau thì show children
                   khi show children dùng biến close tạo đc từ parent componentn đề set close cho state: openName
            ==> khác nhau thi return null    

 4. add child component as a properties to parent component
*/
