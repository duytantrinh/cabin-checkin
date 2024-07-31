import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // lấy value từ  url xuống ( 7 || 30 || 90) , nếu ko có thì default là 7 ngày
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // ví dụ giá trị là last=7 ngày ==> queryDate = today - 7
  // vidu hom nay là July 29 thì querydate với last = 7 trả về July 23 với dạng ISOString: 2024-07-23T03:27:07.981Z
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}
