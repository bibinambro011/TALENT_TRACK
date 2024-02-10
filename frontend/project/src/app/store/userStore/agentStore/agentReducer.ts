import { createReducer, on } from "@ngrx/store";
import { agentloginsuccess } from "./agentAction";
import { AgentState } from "./agentState";

const _agentReducer=createReducer(
    AgentState,
   on(agentloginsuccess,(state,action)=>{
    // console.log("reducer is ==>",state)
    const data = { ...action.agentdetails.userdetails };
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



export function AgentReducer(state: any, action: any) {
    return _agentReducer(state, action);
  }