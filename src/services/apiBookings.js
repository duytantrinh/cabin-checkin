import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

// show data của tất cả các lần booking
// filter là Objetc chứa fieldName và Value
export async function getAllBooking({ filter, sortBy, page }) {
  let query = supabase.from("bookings").select(
    "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName,email)",
    { count: "exact" }
    // return length của results
  );
  // show tất cả các columns đc chọn trong bảng bookings,
  // column name trong cabins và column fullName,email trong guests
  // chỉ select được khi 3 bảng có kết nối foreign key với nhau
  // .select("*, cabins(*), guests(*)");
  // show tất cả các columns trong bàng bookings, cabins và guests

  // ==== Filter bằng query
  if (filter) {
    query = query[filter.method || "eq"](filter.fieldName, filter.value); // chỉ load theo điều kiện truyền vô cho query
  }
  // NÂNG CAO cách gọi 2 điều kiện lọc bên useBookings.js:  1 là status === filterValue , 2 là totalPrice >= 53000
  // console.log(filter) lúc này filter là 1 array nên phải loop nó và gán vào query
  // if (filter !== null)
  //   filter.map((vl) => (query = query[vl.method](vl.fieldName, vl.value)));

  // ==== Sort bằng query
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc", // đều kiện để hiển thi chiều asc
    }); // .order() viết bởi supabase, default = desc

  // ==== Pagination : load dữ liệu và pagination data tại database
  if (page) {
    let from = (page - 1) * PAGE_SIZE;
    let to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  // lần fetch đầu tiên filter === null => load tat ca data
  const { data, error, count } = await query;
  if (error) {
    console.error(error);

    throw new Error("Booking could not be loaded");
  }

  return { data, count };
}

//  show data của 1 id Booking
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();
  // .eq nghĩa là equal , .gte("totalPrice", 5000) : totalPrice greater or equal than 5000,  .lte("totalPrice", 5000) : totalPrice less or equal than 5000,
  // xem thêm : https://supabase.com/dashboard/project/ibzdhmupeiarrneigyrp/api?resource=bookings
  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date.
// Useful to get bookings created in the last 30 days, for example.
// date: phải là kiểu ISOString
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));
  // thêm { end: true } để lấy giây cuối cùng của today để compare số ngày so với created_at
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
