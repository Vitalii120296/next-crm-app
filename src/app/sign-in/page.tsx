import { Suspense } from "react";
import SignIn from "./SignIn";

const SignInPage = () => {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  );
};

export default SignInPage;
