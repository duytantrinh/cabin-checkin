import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isFetching,
    data: booking = {},
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    // getBooking(bookingId) có parameter nên phải gọi () => => getBooking(bookingId),
    // hàm getBooking chỉ trả về data của 1 id boooking
    queryFn: () => getBooking(bookingId),
  });

  return { isFetching, booking, error };
}
