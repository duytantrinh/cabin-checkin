import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
`;

function CabinRow({ cabin }) {
  // const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();

  /* start: duplicate row 
  do ta đã tạo hook useCreateCabin() ở 1 component riêng nên bây giờ chỗ nào muốn dùng chỉ cần gọi nó
  */
  const { createCabin } = useCreateCabin();

  function handleDuplicate() {
    // truyền vào kiểu data giống với data của cabin
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  /* end:: duplicate row */

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    image,
    discount,
    description,
  } = cabin;

  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        {/* truyền vào cho hàm mutate (currentId) 
        mutate là hàm xử lý cuối cùng : mutate(curId) === handleDelete(curId)
        */}
        <ButtonContainer>
          {/* gọi Modal Compound Component*/}
          <Modal>
            <Menus.Menu>
              {/* // để open/close menu */}
              <Menus.Toggle id={cabinId} />

              {/* trong Menu.List chỉ chứa nhưng gì liên quan đến Menu/Button */}
              <Menus.List id={cabinId}>
                {/* // 3 nút duplicat,edit/delete*/}
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>

                {/* // gọi button Edit */}
                <Modal.OpenButton opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.OpenButton>

                {/* // gọi button delete */}
                <Modal.OpenButton opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.OpenButton>
              </Menus.List>

              {/* // Modal table chèn vô sau action onClick thì sẽ nằm bên ngoài Menu.list */}
              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName={cabin}
                  onConfirm={() => deleteCabin(cabinId)}
                  disabled={isDeleting}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>

          {/* <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
            <HiTrash />
          </button> */}
        </ButtonContainer>
      </Table.Row>
      {/* {showForm && <CreateCabinForm cabinToEdit={cabin} />} */}
    </>
  );
}

export default CabinRow;
