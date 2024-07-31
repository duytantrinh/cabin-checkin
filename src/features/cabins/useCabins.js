import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isFetching,
    data: cabins,
    error,
  } = useQuery({
    // unique : phải là dạng array  ==> query  ["cabin"] đã đc lưu tại cache
    // tại các component khác nếu muốn dùng query này thì chỉ cần gọi ["cabins"]
    queryKey: ["cabins"],
    // function để fetching API , cần truyền vào 1 promise
    queryFn: getCabins, // chỉ gọi tên getCabins, KHƠNG dc gọi thực thi getCabins()
  });

  return { isFetching, cabins, error };
}
