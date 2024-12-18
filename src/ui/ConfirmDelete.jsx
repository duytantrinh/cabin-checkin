import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  console.log(resourceName);
  return (
    <StyledConfirmDelete>
      <Heading as="h3">
        Delete{" "}
        {resourceName.name ? resourceName.name : resourceName?.guests?.fullName}
      </Heading>
      <p>
        Are you sure you want to delete{" "}
        {resourceName.name ? resourceName.name : resourceName?.guests?.fullName}{" "}
        permanently? This action cannot be undone.
      </p>

      <div>
        <Button
          $variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          $variation="danger"
          disabled={disabled}
          onClick={() => onConfirm(resourceName.id)}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
