import { useEffect, useRef } from "react";

// detecting action click outside Window
function useOutsideClick(action, listenCapturing = true) {
  // 1 ref: khởi tạo
  const ref = useRef();

  // detecting action click outside Window
  useEffect(
    function () {
      function handleClick(e) {
        // 3 ref : dùng ref để tác động / xử lý với DOM

        if (ref.current && !ref.current.contains(e.target)) {
          // check nếu ref.current == element vừa đc click có contains element Window Moddal ko ?
          // nếu KO ==> đóng WIndow Modal
          action();
        }
      }

      // phải thêm gia tri thứ 3 === true để event chỉ tac động DOM theo chiều xuống Capturing
      // https://www.w3schools.com/js/js_htmldom_eventlistener.asp
      document.addEventListener("click", handleClick, listenCapturing);

      // dùng addEventListener thì phải gọi cleanup function để return removeEventListener
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [action, listenCapturing]
  );

  return ref;
}

export default useOutsideClick;
