import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
///////////////////////////////////
// ********** xem file CreateCabinForm_beforeEdit.jsx để hiều cách sử dụng useForm
//////////////////////////////////

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ onCloseModal, cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  // kiềm tra xem là Edit hay Add, nếu Edit thì sẽ có cabinToEdit ==> có editId => isEditSession === true
  const isEditSession = Boolean(editId);

  // gán value của cabin truyền vào từ CabinRow qua cho defaultValues ==> getValues cũng nhận đc các giá trị đó
  //                                                                 ==> hiển lên tại các input như defaultValue
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // console.log(getValues());

  const { errors } = formState;

  // mutate cho create new cabin - useCreateCabin.js
  const { isCreating, createCabin } = useCreateCabin();

  // mutate cho edit cabin - useEditCabin.js
  const { isEditting, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditting;

  function onSubmitted(data) {
    // khi edit cabin , image sẽ là kiểu string,
    // tạo mới, image là đang Object
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // mutate có 2 trường hợp
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image: image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.(); //// có truyền vào prop OnCloseModel thì mới gọi nó, KO có th2i thôi
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.error(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmitted, onError)}
      type={onCloseModal ? "modal" : "regular"}
      // css cho Form bằng condition type
    >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>

        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= Number(getValues().regularPrice) ||
              "Discount cannot be greater than RegularPrice",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          type="file"
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            // khi edit image input always empty nen phai set false truoc khi bat loi
            required: isEditSession ? false : "This field is required",
          })}
        />
        {errors?.image?.message && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        {/* gọi type="reset" ==> khi nhấn vào Button nó sẽ tự reste các input , regular html  */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          // có truyền vào prop OnCloseModel thì mới gọi nó, KO có th2i thôi
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit" : "Create"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
