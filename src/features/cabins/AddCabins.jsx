import Button from "../../ui/Button";

import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
//import CabinTable from "./CabinTable";

// tạo Compound Component Pattern cho AddCabin
function AddCabin() {
  return (
    <Modal>
      {/* // opens và name phải cùng tên để bên Modal dùng condition cho open hoặc close  */}
      <Modal.OpenButton opens="cabin-form">
        <Button>Add New Cabin</Button>
      </Modal.OpenButton>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* có thể tạo nhiều Modal Window , phân biệt bằng props   */}
      {/* <Modal.OpenButton opens="table">
        <Button>Cabin Table</Button>
      </Modal.OpenButton>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
    </Modal>
  );
}

// tạo bình thường để dùng cho Modal bình thường KHông dùng Compund COmponent Pattern
// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onCloseModal={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
