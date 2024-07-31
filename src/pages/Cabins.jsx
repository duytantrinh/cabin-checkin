import CabinTable from "../features/cabins/CabinTable";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabins from "../features/cabins/AddCabins";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
//import { getCabins } from "../services/apiCanbins";

function Cabins() {
  //   useEffect(function () {
  //     getCabins().then((data) => console.log(data));
  //   }, []);

  /// khi fetching bằng useEffect() mỗi lần click lại component đó => data sẽ đc fetching again
  // khi fetching data by React Query => data sẽ đc lưu vào cache ==> chỉ cần fetch 1 lần, mỗi lần click lại component đó, data sẽ đc gọi từ cache

  return (
    <>
      <Row type="horizontal">
        {/* gọi prop bằng as="h1" thì sẽ hiển thị html là h1 */}
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations></CabinTableOperations>
      </Row>

      <Row>
        {/* // tạo React Query bên CanbinTAble */}
        <CabinTable />
        <AddCabins />
      </Row>
    </>
  );
}

export default Cabins;

/*
  dùng useEffect để load data get từ supabase
*/
