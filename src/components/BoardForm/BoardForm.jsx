import { AuthForm } from "../Form/AuthForm";
import { InputWrapper } from "../InputWrapper/InputWrapper";
import { FormError } from "../FormError/FormError";
import { useState } from "react";
import PropTypes from "prop-types";

export function BoardForm({ defValue = "" }) {
  const [fileSize, setFileSize] = useState(0);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFileSize(file.size);
  };
  return (
    <AuthForm
      name={"newBoard"}
      intent={"create-board"}
      btnText={"Save Board"}
      enctype="multipart/form-data"
      canSubmit={fileSize < 1048576}
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
      {fileSize > 1048576 && (
        <FormError text="Image size must be 1mb or less" />
      )}
    </AuthForm>
  );
}

BoardForm.propTypes = {
  defValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
