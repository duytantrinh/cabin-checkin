import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useBookings } from "./useBookings";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { isFetching, bookings, count } = useBookings();

  if (!bookings) return <Empty resourceName="bookings" />;

  if (isFetching) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;

/* --- cách 2: Filter tại server API - XỬ LÝ TẠI database ( cách 1 Filter tại Client xem CabinTable)
-- BookingTableOperations: truyền vào các props fieldName và Value vào cho BookingTable , filedName Phải giống tên columns cần lọc bên database
-- useBooking.jx: tạo 1 Object filter {fieldName, value} để truey62n qua cho apiBooking query từ database , filedName Phải giống tên columns cần lọc bên database
-- apiBooking.js: lấy props filter và vei16t thêm query để lọc   ==> truyền qua BookingTable final data để show ra UI

*/

/* -- cách 2 Sorting tại Api


*/
