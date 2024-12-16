import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";

import { useLogin } from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    // login là mutate funtion nên ta có thể set thêm Object đàng sau nó
    // có thể set bên userLogin hoặc tại đây (UI page) đều được
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <>
    
      (testing email: tan123@gmail.com / pass: tan123)
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          disabled={isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
      </>
  );
}

export default LoginForm;

/*
  khi login form thành công page chuyển đến DashBoard và trả về isAuthenticated === true
  
  nhưng bây giờ nếu vào trực tiếp http://localhost:5173/dashboard vẫn ĐƯỢC 
          ==> cần tạo ProtectedRoute.jsx bao bọc bên ngoài toàn AppLayout để check user Authenticated trước
                            nếu có isAuthenticated === true thì vào http://localhost:5173/dashboard bình thường 
                            nêu vào trực tiếp http://localhost:5173/dashboard ==> ko qua login ==> isAuthenticated === false ==> tự động quay về trang Login.jsx

*/
