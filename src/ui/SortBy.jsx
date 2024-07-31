import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // get value trên url bằng searchParams.get("sortBy") hoặc gán = "" tại lần đầu vào dg link
  const sortBy = searchParams.get("sortBy") || "";

  // gắn field và value của sortby lên url
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);

    // naviagte về trang 1 (page =1)
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
