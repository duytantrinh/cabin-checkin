import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //===========Start: FILTER
  const filterValue = searchParams?.get("status");

  // tạo Object filter để lọc tại apiBookings
  // fieldName PHẢI đặt trùng tên với columns muốn filter bên database
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { fieldName: "status", value: filterValue, method: "eq" };

  // NÂNG CAO cách lọc 2 điều kiện:  1 là status === filterValue , 2 là totalPrice >= 53000
  // const filter =
  //   !filterValue || filterValue === "all"
  //     ? null
  //     : [
  //         { fieldName: "status", value: filterValue, method: "eq" },
  //         { fieldName: "totalPrice", value: 5300, method: "gte" },
  //       ];
  //============ end: Fiter

  // === Pagination:
  // get page từ url
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //===========================Start : SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  // cắt value "startDate-desc" thành field: startDate và direction: desc
  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };
  //============ end: SORT

  //=========== Query
  const {
    isFetching,
    // count là tổng số results của query
    data: { data: bookings, count } = {}, // khi có lỗi underfined vì initial CHƯA fetch DATA thì cứ thêm default = {}
    error,
  } = useQuery({
    // ta có thể truyền thêm dieukien thứ 2 sau ["bookings"]
    // mỗi lần filter, sortBY, page thay đổi react query sẽ tự refetch và store tại cache
    queryKey: ["bookings", filter, sortBy, page],
    // function để fetching API , truyền vào Object filter
    queryFn: () => getAllBooking({ filter, sortBy, page }),
  });

  // ======== RE-Fetching : fetch data trước khi nÓ hiển thị ra UI
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      // function để fetching API , truyền vào Object filter
      queryFn: () => getAllBooking({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      // function để fetching API , truyền vào Object filter
      queryFn: () => getAllBooking({ filter, sortBy, page: page - 1 }),
    });

  return { isFetching, bookings, error, count };
}
