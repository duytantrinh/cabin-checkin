import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

import { useSettings } from "./useSettings";

import { useUpdateSetting } from "./useUpdateSettings";
import { useForm } from "react-hook-form";

function UpdateSettingsForm() {
  const { register, handleSubmit } = useForm();

  const {
    isFetching,
    settings: {
      breakfastPrice,
      maxBookingLength,
      maxGuestPerBooking,
      minBookingLength,
    } = {},
  } = useSettings();
  // vì bên apiSettings dùng async function cho useSettings nên ban đầu settings sẽ là underfined nên ta ko ta destructure nó
  //                                                                          ==> gán cho {} empty Object trước

  // update settings
  const { isUpdating, updateSetting } = useUpdateSetting();

  function onSubmmitted(data) {
    console.log(data);

    updateSetting({ ...data });
    // vì đã register các input với table settings nên
    // khi ...data thì dữ liệu mới tại các register dưới input sẽ update vào acc1 cột có cùng tên tương ứng
    // ex: dữ liệu mới tại input {...register("maxGuestPerBooking")} sẽ đc gán vào collumn maxGuestPerBooking
    // PHẢI ĐẠT ID Ở INPUT TRÙNG VỚI TÊN COLUMN TƯƠNG ỨNG TRONG TABLE
  }

  // return <Spinner /> phải nằm sau cùng
  if (isFetching) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmmitted)}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          {...register("minBookingLength")}
        />
        {/* id phải đặt trùng tện với tên column tướng ứng trong table settings ==> khi update({...data}) sẽ vào đúng column */}
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          {...register("maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestPerBooking"
          disabled={isUpdating}
          defaultValue={maxGuestPerBooking}
          {...register("maxGuestPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          {...register("breakfastPrice")}
        />
      </FormRow>
      <Button>Update </Button>
    </Form>
  );
}

export default UpdateSettingsForm;

/* ======= Load data
1. viết getSettings() tại apiSettings
2. tạo hook : useSettings.js
3. tại UpdateSettingsForm: gọi hook useSettings và destructuring các biến ra
4. dàn các biến vào các input tương ứng với defaultValue

=============== update bằng useForm
1. tại apiSetting : viết hàm updateSetting(newSetting) ==> truyền vào newSetting
2. tạo hook useUpdateSetting 
3. tại UpdateSettingsForm: gọi hook useForm để kết nối với các input
                           gọi hook useUpdateSetting dể sử dụng sql
                          dùng {handleSubmit(onSubmmitted)} để update data
*/
