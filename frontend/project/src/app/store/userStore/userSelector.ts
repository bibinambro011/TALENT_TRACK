import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./userState";

const getUserState = createFeatureSelector<typeof UserState>('user');

export const getUserInfo = createSelector(getUserState,(state)=>{
   return state.userInfo;
})