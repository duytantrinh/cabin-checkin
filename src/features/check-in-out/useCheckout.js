import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

function useCheckout() {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  // hàm update checked in
  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out", // chuyển status thành check-out
      }),

    // onSuccess sẽ nhận đc data trả về từ hàm updateBooking
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
      // cách 2: queryClient.invalidateQueries({ queryKey: ["booking"]});
      // navigate("/"); // return về DashBoard
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkOut, isCheckingOut };
}

export default useCheckout;

/*
 update, insert, delete trong React Query dùng useMutation()

 load data trong React Query dùng useQuery()
*/
