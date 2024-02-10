import { createAction, props } from "@ngrx/store";
import { userlog,logsuccess, successresponsedata } from "src/app/Model/userModel";

export const LOGIN_AGENT='[auth] loginagent';
export const LOGIN_AGENT_SUCCESS = '[auth] agentloginsuccess';


export const loginagent=createAction(LOGIN_AGENT,props<{agentCredentails:userlog}>())
export const agentloginsuccess=createAction(LOGIN_AGENT_SUCCESS,props<{agentdetails:successresponsedata}>())