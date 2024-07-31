import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import PropTypes from "prop-types";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";

// dùng useQuery() để fetching và store data in cache
function CabinTable() {
  const { isFetching, cabins } = useCabins();

  ///===================================== start: filter
  // đọc dữ liệu đc search trên urtl
  const [searchParams] = useSearchParams();

  // dùng khi cabins underfined
  //const navigate = useNavigate();
  if (!cabins) {
    return <Empty resourceName="cabins" />;
    //  navigate("/cabins");
  }

  // get giá trị của field"discount" sau dấu ? , lần dầu thì lấ default là all
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount !== 0);

  ///======= end: filter

  // =========================== start:  SortBY
  const sortBy = searchParams.get("sortBy") || "name-asc";

  // tách value của sortBy ra thành name - direction ( luôn đặt value = name-direction tại đâu vào (CabinTableOperations.jsx))
  const [field, direction] = sortBy.split("-");

  // tạo giatri modifier = 1 cho chiều asc và -1 cho chiều desc
  const modifier = direction === "asc" ? 1 : -1;

  let sortedCabins;

  // sort tên theo 1 cách khác
  if (field === "name") {
    sortedCabins = filteredCabins.sort(
      (a, b) => a[field].localeCompare(b[field]) * modifier
    );
    // mặc đinh là chiều asc nhưng khi * modifier = -1 thì đổi lại thành chiều desc (Z->A)
  } else {
    // sort cho những yêu cầu còn lại
    sortedCabins = filteredCabins.sort(
      (a, b) => (a[field] - b[field]) * modifier
    );
  }

  // ==== end:  SortBY

  if (isFetching) return <Spinner />;

  return (
    // tạo Compound Menus outside của table để keep track tòan bộ các Row
    <Menus>
      {/* // gọi Compound Component Table */}
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {/* // cách render child component bên trong Compound Component Pattern */}
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
        {/* cách bình thường: 
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
        ))} */}
      </Table>
    </Menus>
  );
}

// sửa lỗi ‘children’ is missing in props validation eslint(react/prop-types)
// link : https://forhjy.medium.com/react-solution-for-children-is-missing-in-props-validation-eslint-react-prop-types-2e11bc6043c7
CabinRow.propTypes = {
  data: PropTypes.array,
  isFetching: PropTypes.bool,
};

export default CabinTable;

/* ======= cách 1: Filter tại client === lấy hết data về 1 lần rồi filter dưới data (cách 2:Filter tại server API - xem BookingTable)
  - tạo các element và value sau dầu ? trên link url bằng useSearchParams() :  searchParams.set("discount", value);

-- Filter.jsx: khởi tạo props fieldName và value trên url bằng searchParams.set
-- CabinTableOperations: truyền vào các props fieldName và Value vào cho BookingTable
-- CabinTable : get fieldName và Value  từ url bằng searchParams.get và xử lý dữ liệu rồi truyền sang BookingRow
-- CabinRow : show data ra UI

*/
