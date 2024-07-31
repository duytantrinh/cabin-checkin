import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  // nếu button nhận đc props === active thi css khác
  // thêm $ trước active để loại bỏ Warning: Received "f a l s e/ t r u e" for a non-boolean attribute
  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

// tạo 2 argument để Filter flexible : 2 argument fieldName, options sẽ tuỳ biến tại parent component CabinTableOperations
function Filter({ fieldName, options }) {
  // tạo url với search và value truyền vào
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(fieldName) || options[0].value;

  function handleClick(value) {
    // phải tạo url cho nó , "discount" : là field hiển thi trên url sau dấu ? , value giá trị gán vào sau dấu = để search hoặcfilter
    //http://localhost:5173/cabins?discount=all
    searchParams.set(fieldName, value);

    // khi click vào filter thì bắt buộc trả về page=1 trước rồi mới load data
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          //  thêm $ trước prop active để loại bỏ Warning:
          $active={option.value === currentFilter}
          // khi đã click vào nó thi disabled ko cho click again
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;

/* ========  useSearchParams()

1. tạo const [searchParams, setSearchParams] = useSearchParams();

2. set field và value cho nó 
tại Filter:  searchParams.set("discount", "all") 
        ==> url là: http://localhost:5173/cabins?discount=all

3. chỗ nào muốn lấy field và value xuống để làm việc thì dùng
tại CabinTable:   searchParams.get("discount") 

*/

/* cách tạo Filter 
  - tạo các element và value sau dầu ? trên link url bằng useSearchParams() :  searchParams.set("discount", value);

-- Filter.jsx: khởi tạo props fieldName và value trên url bằng searchParams.set
-- CabinTableOperations: truyền vào các props fieldName và Value vào cho BookingTable
-- CabinTable : get fieldName và Value  từ url bằng searchParams.get và xử lý dữ liệu rồi truyền sang BookingRow
-- CabinRow : show data ra UI


*/
