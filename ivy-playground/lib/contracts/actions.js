// external imports
import { push } from "react-router-redux";
import { getCompiled, getCompiled2, getInputMap, getInputMap2, getInstantiated, getInstantiated2 } from "../templates/selectors";
// internal imports
import { getFulfilledSpendTransaction, getResult, getSpendContract, getSpendContractId } from "./selectors";
export const SHOW_UNLOCK_INPUT_ERRORS = "contracts/SHOW_UNLOCK_INPUT_ERRORS";
export const showUnlockInputErrors = (result) => {
    return {
        type: SHOW_UNLOCK_INPUT_ERRORS,
        result
    };
};
export const UPDATE_ERROR = "contracts/UPDATE_ERROR";
export const updateError = (error) => {
    return {
        type: UPDATE_ERROR,
        error
    };
};
export const CREATE_CONTRACT = "contracts/CREATE_CONTRACT";
export const create = () => {
    return (dispatch, getState) => {
        const state = getState();
        const inputMap = getInputMap(state);
        const template = getCompiled(state);
        const instantiated = getInstantiated(state);
        dispatch({
            type: CREATE_CONTRACT,
            instantiated,
            template,
            inputMap
        });
        dispatch(push("/unlock"));
    };
};
export const create2 = () => {
    return (dispatch, getState) => {
        const state = getState();
        const inputMap = getInputMap(state);
        const template = getCompiled(state);
        const instantiated = getInstantiated(state);
        const inputMap2 = getInputMap2(state);
        const template2 = getCompiled2(state);
        const instantiated2 = getInstantiated2(state);
        dispatch({
            type: CREATE_CONTRACT,
            instantiated,
            template,
            inputMap
        });
        dispatch({
            type: CREATE_CONTRACT,
            instantiated: instantiated2,
            template: template2,
            inputMap: inputMap2
        });
        dispatch(push("/unlock"));
    };
};
export const SPEND_CONTRACT = "contracts/SPEND_CONTRACT";
export const spend = () => {
    return (dispatch, getState) => {
        const state = getState();
        const contract = getSpendContract(state);
        const spendTx = getFulfilledSpendTransaction(state);
        const result = getResult(state);
        if (result.success) {
            dispatch({
                type: SPEND_CONTRACT,
                unlockTxid: spendTx.hash("hex"),
                contract
            });
        }
        else {
            throw Error("spend called with invalid contract");
        }
        dispatch(push("/unlock"));
    };
};
export const SET_CLAUSE_INDEX = "contracts/SET_CLAUSE_INDEX";
export const setClauseIndex = (selectedClauseIndex) => {
    return {
        type: SET_CLAUSE_INDEX,
        selectedClauseIndex
    };
};
export const UPDATE_INPUT = "contracts/UPDATE_INPUT";
export const updateInput = (name, newValue) => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_INPUT,
            name,
            newValue
        });
    };
};
export const UPDATE_INPUT_TWO = "contracts/UPDATE_INPUT_TWO";
export const updateInput2 = (name, newValue) => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_INPUT_TWO,
            name,
            newValue
        });
    };
};
export const UPDATE_CLAUSE_INPUT = "contracts/UPDATE_CLAUSE_INPUT";
export const updateClauseInput = (name, newValue) => {
    return (dispatch, getState) => {
        const state = getState();
        const contractId = getSpendContractId(state);
        dispatch({
            type: UPDATE_CLAUSE_INPUT,
            contractId,
            name,
            newValue
        });
        // dispatch(updateError())
    };
};
