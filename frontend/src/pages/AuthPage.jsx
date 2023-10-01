
import SignupCard from "../components/SignupCard";
import LoginCard from "../components/LoginCard";
import React from "react";
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtoms";


function AuthPage() {
//const [value, setValue] = useState("login")
// const authScreenState = useRecoilValue(authScreenAtom);
//onst setAuthScreenState = useSetRecoilState(authScreenAtom)
  const authScreenState = useRecoilValue(authScreenAtom);
  console.log(authScreenAtom);
  console.log(authScreenState);
  return (
    <>
    {/* <SignupCard/> */}
    {/* <LoginCard/> */}
    {authScreenState === "login" ? <LoginCard/> : <SignupCard/>}

    
    </>
  )
}

export default AuthPage