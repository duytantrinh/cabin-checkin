import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";

import DashBoard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayOut from "./ui/AppLayOut";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

// 1. tạo QueryClient and Cache cho React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: thời gian state tự động refetch/update với API server ,  0 ==> refetching ngay lap tuc
      staleTime: 0,
    },
  },
});

function App() {
  return (
    // DarkMode là contextApi nằm ngoài cùng sẽ có tác dụng lên toàn app
    <DarkModeProvider>
      {/* // 2. provide QueryClient cho toàn App */}
      <QueryClientProvider client={queryClient}>
        {/* 3. chèn ReactQueryDevtools để check status, quá trình flow của query */}
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            {/* // ProtectedRoute sẽ là cha của AppLayout 
          ==> ta sẽ viết authentication cho User tại ProtectedRoute => nó sẽ check authenticated User cho tòan bộ App
          */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayOut />
                </ProtectedRoute>
              }
            >
              {/* index trang đầu tiên khi mớ website */}
              <Route index element={<DashBoard />}></Route>
              <Route path="dashboard" element={<DashBoard />}></Route>
              <Route path="bookings" element={<Bookings />}></Route>
              <Route path="bookings/:bookingId" element={<Booking />}></Route>
              <Route path="checkin/:bookingId" element={<Checkin />}></Route>

              <Route path="account" element={<Account />}></Route>
              <Route path="cabins" element={<Cabins />}></Route>

              <Route path="settings" element={<Settings />}></Route>
              <Route path="users" element={<Users />}></Route>
            </Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
        {/* // chèn toast vào toàn bô app */}
        <Toaster
          position="top-center"
          gulter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
              style: {
                borderBottom: "5px solid var(--color-green-700)",
              },
            },
            error: {
              duration: 5000,
              style: {
                borderBottom: "5px solid var(--color-red-700)",
              },
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;

// import styled from "styled-components";
// import GlobalStyles from "./styles/GlobalStyles";
// import Input from "./ui/Input";
// import Button from "./ui/Button";
// import Heading from "./ui/Heading";
// import Row from "./ui/Row";

// // styled-component cho App
// const StyledApp = styled.main`
//   padding: 20px;
// `;

// function App() {
//   return (
//     <>
//       {/* chèn global styled-components cho toàn App, global styled-components đc
//       tạo tại GlobalStyles.js */}
//       <GlobalStyles />

//       <StyledApp>
//         {/* ko gọi type thì nó sẽ lấy giá trị default type="vertical" */}
//         <Row>
//           <Row type="horizontal">
//             <Heading as="h1">Hello</Heading>
//             <div>
//               <Heading as="h2">Check in/out</Heading>
//               <Button
//                 variation="primary"
//                 size="medium"
//                 onClick={() => alert("hello")}
//               >
//                 Check in
//               </Button>
//               <Button onClick={() => alert("out")}>Check out</Button>
//             </div>
//           </Row>

//           <Row>
//             {/* // truyền as prop thì nó sẽ tạo html đúng như tên đặt
//         ex: as="h3" ==> <h3>Form</h3> */}
//             <Heading as="h3">Form</Heading>
//             <form>
//               <Input
//                 type="text"
//                 placeholder="thêm type, placeholderr, value như input bình thương"
//               />
//               <Input
//                 type="text"
//                 placeholder="thêm type, placeholderr, value như input bình thương"
//               />
//             </form>
//           </Row>
//         </Row>
//       </StyledApp>
//     </>
//   );
// }

// export default App;
