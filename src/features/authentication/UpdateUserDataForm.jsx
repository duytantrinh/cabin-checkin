import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import useUser from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();
  // 1. lấy được data của current user

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const { isUpdating, updateUser } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          type="file"
          id="avatar"
          disabled={isUpdating}
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;

/* - các bước update user info ( PASSWORD LÀM FORM riêng NHƯNG CŨNG 3 BƯỚC TƯƠNG TỰ NHƯ VÂY)
I. tạo updateCurrentUser({ password, fullName, avatar })  tại apiAuth.js làm 3 bước
    ( 1 lần update chỉ update đc fulName HOẶC password (vì viết khác form) )
  1. Update password OR fullName
  2. Upload avatar image vào storage của supabase
  3. Update url của avatar vào user

II. tạo userUpdateUser: dùng react query đọc query trong apiAuth và trả về updateUser khi onSuccess

III. tại UpdateUserDataForm
  1. lây email và fullName của current user tại useUser();
  2. dùng handleSubmit() để xử lý dữ liệu khi onSuccess và error

*/
