import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;

/*  DashBoard -> apiBookings -> useRecentBookings ->  DashboardLayout -> Stats -> Stat
                             -> useRecentStays
              -> DashboardFilter -> Filter (tạo url với searchParams.set(last, 7 , 30, 90);
  
  tại apiBookings:  viết 2 hàm getStaysAfterDate(date)     : thống kê số lượng người thật sự đã đến và ở bằng startDate     
                              getBookingsAfterDate(date)   : thống kê số lượng người đã bookings bằng created_at

  tại useRecentBookings: dùng Reatc Query lấy ra đc results
  
  DashboardLayout gọi result từ useRecentBookings và show ra UI
  */
