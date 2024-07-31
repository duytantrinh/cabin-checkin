import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  // lấy value từ  url xuống ( 7 || 30 || 90) , nếu ko có thì default là 7 ngày
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // ví dụ giá trị là last=7 ngày ==> queryDate = today - 7
  // vidu hom nay là July 29 thì querydate với last = 7 trả về July 23 với dạng ISOString: 2024-07-23T03:27:07.981Z
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  // chỉ t1inh là stays khi status là checked-in hoặc checked-out
  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isLoading, stays, confirmedStays, numDays };
}
