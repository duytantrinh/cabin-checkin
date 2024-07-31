import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load teh authenticatied user
  const { isLoading, isAuthenticated } = useUser();

  // 3. If there is NO authenticated user, redirect to login page
  // navigate CHỈ GỌI ĐƯỢC bên trong CALLBACK function hoặc useEffect()
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 2. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // 4. If there IS authenticated user, toàn bộ các page/component con của Protected có thể RENDER the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
