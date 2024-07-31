import BookingDetail from "../features/bookings/BookingDetail";

function Booking() {
  return <BookingDetail />;
}

export default Booking;

/* page Booking.jsx chỉ để điều hướng từ App.jsx đến đây
KHÔNG NÊN có bất kỳ side effect hay hàm fetch data ở đây 

từ page này gọi  <BookingDetail /> để xử lý side effect hay hàm fetch data
            tất cả những gì liên quan đến Booking sẽ đc viết và tạo trong features/bookings .....
        ==> dễ quan lý và phát triển
*/
