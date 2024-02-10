import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AgentState } from "./agentState";

const getAgentState = createFeatureSelector<typeof AgentState>('agent');

export const getAgentInfo = createSelector(getAgentState,(state)=>{
   return state.agentInfo;
})