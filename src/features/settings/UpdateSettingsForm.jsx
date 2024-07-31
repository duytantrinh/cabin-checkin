import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import Spinner from "../../ui/Spinner";

import { useSettings } from "./useSettings";

import { useUpdateSetting } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    isFetching,
    settings: {
      breakfastPrice,
      maxBookingLength,
      maxGuestPerBooking,
      minBookingLength,
    } = {},
  } = useSettings();

  // update settings
  const { isLoading, updateSetting } = useUpdateSetting();

  // return <Spinner /> phải nằm sau cùng
  if (isFetching || isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    // tạo tên key Objewct trùng với tên column trong table console.log([field])
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          disabled={isLoading}
          defaultValue={minBookingLength}
          // onBlur xảy ra khi thoát focus khỏi input
          // "minBookingLength" đặt cùng tên với biến value minBookingLength để hàm handleUpdate(e, field) sẽ update vào biến tương ứng
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          disabled={isLoading}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestPerBooking"
          disabled={isLoading}
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          disabled={isLoading}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
      {/* <Button>Update </Button> */}
    </Form>
  );
}

export default UpdateSettingsForm;

/* ======= Load data
1. viết getSettings() tại apiSettings
2. tạo hook : useSettings.js
3. tại UpdateSettingsForm: gọi hook useSettings và destructuring các biến ra
4. dàn các biến vào các input tương ứng với defaultValue

=============== cách 2: update bằng useForm
1. tại apiSetting : viết hàm updateSetting(newSetting) ==> truyền vào newSetting
2. tạo hook useUpdateSetting 
3. tại UpdateSettingsForm: gọi hook useForm để kết nối với các input
                           gọi hook useUpdateSetting dể sử dụng sql
                          dùng {handleSubmit(onSubmmitted)} để update data
*/
