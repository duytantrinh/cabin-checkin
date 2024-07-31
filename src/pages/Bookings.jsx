import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;

/* các bước để hiển thị all bookings
1. apiBookings .js : viết sql : getAllBooking()
2. tạo useBookings.js: tạo dùng React Query tạo function useBookings() để lấy dữ liệu từ sql
3. chèn BookingTable vào Booking 
                  trong BookingTable.jsx: gọi UseBookings() để load data hiển thị ra UI
4. tại BoonkingTable: chèn BookingRow -> Table
                                      -> Tag
*/
