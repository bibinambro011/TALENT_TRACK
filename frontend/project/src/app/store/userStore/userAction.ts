import { createAction, props } from "@ngrx/store";
import { userlog,logsuccess, successresponsedata } from "src/app/Model/userModel";

export const LOGIN_USER='[auth] loginuser';
export const LOGIN_USER_SUCCESS = '[auth] userloginsuccess';


export const loginuser=createAction(LOGIN_USER,props<{userCredentails:userlog}>())
export const userloginsuccess=createAction(LOGIN_USER_SUCCESS,props<{userdetails:successresponsedata}>())