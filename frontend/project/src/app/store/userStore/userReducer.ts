import { createReducer, on } from "@ngrx/store";
import { userloginsuccess } from "./userAction";
import { UserState } from "./userState";

const _userReducer=createReducer(
    UserState,
   on(userloginsuccess,(state,action)=>{
    // console.log("reducer is ==>",state)
    const data = { ...action.userdetails.userdetails };
    console.log("reducer data is==>",data)
    return {
      ...state,
      userInfo: {
        _id:data.id,
        firstName:data.name,
        email: data.email,
        image:data.image,
        category:data.category,
        role: data.role
      },
    };
  }),

)



export function UserReducer(state: any, action: any) {
    return _userReducer(state, action);
  }