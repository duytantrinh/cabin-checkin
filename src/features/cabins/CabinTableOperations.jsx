import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        fieldName="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by Price (low -> high)" },
          { value: "regularPrice-desc", label: "Sort by Price (high -> low)" },
          {
            value: "maxCapacity-asc",
            label: "Sort by Capacity (low -> high)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by Capacity (high -> low)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;

/* truyền propo tại dây CabinTableOperations

qua Filter: tạo nhận props và xử lý props ==> tạo flexible cho Filter component 

*/
