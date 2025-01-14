import {create} from "zustand/react.js";
import * as log from "react-dom/test-utils";


export const LoginStore = create(()=>({
    sendLogin: async ()=>{
        try {

        }catch (e){
            console.log(e)
        }
    }
}))