import { InputWrapper } from "../InputWrapper/InputWrapper";
import { AuthForm } from "../Form/AuthForm";

export function LoginForm() {
  return (
    <AuthForm name={"login"} btnText={"Login"} intent={"login"}>
      <InputWrapper ref={null} name={"email"} type="email" label="Email:" />
      <InputWrapper ref={null} name="pw" label="Password:" type="password" />
    </AuthForm>
  );
}
