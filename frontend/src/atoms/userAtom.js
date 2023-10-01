import { atom } from "recoil";

//when we visit our webiste for the first time, the value of the user would be whatever that is stored in the local storage
const userAtom = atom({
    key: 'userAtom',
    default: JSON.parse(localStorage.getItem('user-threads')),
})


export default userAtom;
