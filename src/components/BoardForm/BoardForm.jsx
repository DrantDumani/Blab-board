import { AuthForm } from "../Form/AuthForm";
import { InputWrapper } from "../InputWrapper/InputWrapper";
import { FormError } from "../FormError/FormError";
import { useState } from "react";
import PropTypes from "prop-types";

export function BoardForm({ defValue = "", img_id = "" }) {
  const [fileSize, setFileSize] = useState(0);
  const maxFileSize = 1048576;

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFileSize(file.size);
  };
  return (
    <AuthForm
      name={"newBoard"}
      intent={"save-board"}
      btnText={"Save Board"}
      enctype="multipart/form-data"
      canSubmit={fileSize <= maxFileSize}
    >
      <InputWrapper
        name="name"
        label="Board Name:"
        maxLength={20}
        placeholder="Enter a board name"
        defValue={defValue}
      />

      <InputWrapper
        name="boardImg"
        label="Board Image:"
        type="file"
        isRequired={false}
        onChange={handleChange}
      />
      {img_id && <input type="hidden" value={img_id} name="img_id" />}
      {fileSize >= maxFileSize && (
        <FormError text="Image size must be 1mb or less" />
      )}
    </AuthForm>
  );
}

BoardForm.propTypes = {
  defValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  img_id: PropTypes.string,
};
