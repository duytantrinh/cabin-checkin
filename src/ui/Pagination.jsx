import { HiChevronRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

// count: tồng số results nhận đc từ database
function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // lấy current page từ url để tính toán previous, next page
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // tính tổng số trang
  let pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    // trang cuối ==> ko công đc nữa
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    // tạo đường dẫn url dạng /bookings?page=1
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function previousPage() {
    // trang đầu ==> ko trừ đc nữa
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    // tạo đường dẫn url dạng /bookings?page=1
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  // ít hơn = 1 trang thì KHÔNG cần hiễn thị thanh pagination
  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of
        <span> {count} results</span>
      </P>
      <Buttons>
        <PaginationButton onClick={previousPage} disabled={currentPage === 1}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>

        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;

/* =======  muốn hiển thị Pagination tại trạn BookingTable
      1. === tính pagination và hiển data trên Table theo số trang 
- apiBookings: viết query cho pagination
- useBookings.js: get data từ apiBooking  => destructure data => export data, count

      2. === hiển thị con số và button dưới thanh pagination dựa theo data t1inh đc ở trên
- tại BookingTable : chèn Pagination vào Footer , truey62n cho nó props count : count sẽ là tồng results trả về từ database
- tại Pagination.jsx: viết hèm xử lý pagination

      3. === tại Filter.jsx 
      trong  function handleClick(value){
         thêm: 
        searchParams.set("page", 1); // trả về page=1 trước rồi mới load data 
        setSearchParams(searchParams);
      }

*/
