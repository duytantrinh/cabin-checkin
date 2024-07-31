import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
//import { useNavigate } from "react-router-dom";

function useCheckin() {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  // hàm update checked in
  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    // mutationFn chỉ nhận được 1 ARGUMENT NÊN phải pass trong { }
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in", // chuyển status thành check-in
        isPaid: true, // chuyển isPaid thành true
        ...breakfast,
      }),

    // onSuccess sẽ nhận đc data trả về từ hàm updateBooking
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      // cách 2: queryClient.invalidateQueries({ queryKey: ["booking"]});
      // navigate("/"); // return về DashBoard
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkIn, isCheckingIn };
}

export default useCheckin;

/*
 update, insert, delete trong React Query dùng useMutation()

 load data trong React Query dùng useQuery()
*/
