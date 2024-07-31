import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useDeleteBooking() {
  const navigate = useNavigate();

  //useQueryClient() gọi sử dụng QueryClient đc truyền tại App
  const queryClient = useQueryClient();

  // useMutation() delete/update/insert data
  const { isFetching: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    // gọi hàm onSuccess đề tự động refresh trang khi delete cabin thành công
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),

    // onSettled: nghĩa là luôn xảy ra dù success hoặc error
    onSettled: () => navigate("/bookings"),
  });

  return { isDeleting, deleteBooking };
}
