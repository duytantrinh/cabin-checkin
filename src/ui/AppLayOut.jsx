import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr; // col 1: 26rem , col2: flexible theo view screen
  grid-template-rows: auto 1fr; // row 1: auto nghĩa là size of content, row2: flexible
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayOut() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />

      {/* css trong main để tất cả các trang có cùng css container */}
      <Main>
        <Container>
          {/* <Outlet /> gọi tất cả các thẻ con cùa AppLayOut truyền tại App */}
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayOut;
