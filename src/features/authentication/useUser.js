import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export default function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  // isAuthenticated: user?.role === "authenticated" sẽ trả về isAuthenticated === true hoặc false
  //                                                            ==> ta có thể xử lý data từ isAuthenticated
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
