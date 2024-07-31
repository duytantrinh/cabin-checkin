import styled from "styled-components";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";
import { createEditCabin } from "../../services/apiCanbins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

// https://react-hook-form.com/docs/useform/getvalues
function CreateCabinForm() {
  // useForm() hook xử lý Form trong React Query
  //1. bắt buộc phải destructure tên là register, handleSubmit,reset
  /* register: đăng ký các input với useForm
     handleSubmit: receive data if form validation is successful
     reset: reset lại các input sau khi submit
     getValues: get all giá trị trong toàn bộ Form khi submit 
    formState: get all state của Form
     */
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  // console.log(getValues());
  const { errors } = formState;

  //2. useQueryClient() gọi sử dụng QueryClient đc truyền tại App
  const queryClient = useQueryClient();

  // 3. dùng hook useMutation để xử lý kết quả trả về success or error
  const { mutate, isFetching: isCreating } = useMutation({
    mutationFn: createEditCabin, // gọi hàm createCabin bên apiCabins
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmitted(data) {
    //6. mutate là hàm xử lý cuối cùng cho event handler: mutate(data) === handleInsert(data)
    mutate({ ...data, image: data.image[0] });
    // PHẢI upload lên database bằng lệnh data.image[0] ==> nó sẽ update TOÀN BÔ FILE IMAGE bao gồm TÊN image và TYPE của image , có type thì bên storage supabase mới nhận nó là file hình
    // bên apiCabins.js : tại hàm CreateCabin chổ nào chỉ muốn nhận tên ta sẽ dùng newCabin.image.name
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    // gọi thực thi handleSubmit(onSubmitted) tại Form
    // 4. handleSubmit() là React Query function nếu submit data đ1ung thực thi hàm OnSubmitted
    //                                               submit data lỗi thực thi hàm thứ 2 onError
    <Form onSubmit={handleSubmit(onSubmitted, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        {/* data trong từng input sẽ đc gởi đi thông qua id ==> id của từng input phài unique
                                               ==> hàm getValues() lấy dữ liệu thông qua id của input */}
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
        {/* {5. ...register("name")} truyền hook useForm() vào cho input, phải gọi đúng tên của id của input, có thể truyền thêm nhiều diêu kien trong register */}
        {/* băt lỗi input từ hàm register */}
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
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
          id="image"
          // type="file" có thể set type="file" tại component FileInput
          accept="image/*"
          {...register("image", {
            required: "This field is required",
          })}
        />
        {errors?.image?.message && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        {/* type = "reset" ==> chỉ là button bình thường ko thể submit chung với Form */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

/*  --- create new cabin và upload  image cho storage tại supabase
      -------------------------- React Hook Form : useForm();
            ta ko cần tạo state cho các input, button nữa
.... npm i react-hook-form@7

1. bắt buộc phải destructure tên là register, handleSubmit,reset
  const { register, handleSubmit, reset,, getValues, formState } = useForm();
         register: đăng ký các input với useForm
     handleSubmit: xử lý hàm submit
     reset: reset lại các input sau khi submit
     getValues: get all giá trị trong toàn bộ Form khi submit 
    formState: get all state của Form

2. useQueryClient() gọi sử dụng QueryClient đc truyền tại App
  const queryClient = useQueryClient();

3. dùng hook useMutation để xử lý kết quả trả về success or error
  const { mutate, isFetching: isCreating } = useMutation({ })

4. handleSubmit() là React Query function nếu submit data đ1ung thực thi hàm OnSubmitted
                                              submit data lỗi thực thi hàm thứ 2 onError
    <Form onSubmit={handleSubmit(onSubmitted, onError)}>

5.  ...register("name")} truyền hook useForm() vào cho input, phải gọi đúng tên của id của input, có thể truyền thêm nhiều diêu kien trong register 
       
        {errors?.name?.message && <Error>{errors.name.message}</Error>}  :   băt lỗi input từ hàm register 

6.  mutate là hàm xử lý cuối cùng cho event handler: mutate(data) === handleInsert(data)
*/
