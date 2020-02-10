

import { jsonApi } from "./api/api-client";
import { setShipments, setLoading , setQuantity} from "./store";
import {ActionCreator, Action, AnyAction} from 'redux';
import {ThunkAction} from '@reduxjs/toolkit'
import {IState, TShipmentsFromServer} from './interfaces'

type FetchDatafunc = ()=>ActionCreator<ThunkAction<AnyAction,IState, null, AnyAction >>

export const fetchDataByPage :FetchDatafunc = () => {
  return function(dispatch, getState) {
    const { pageNumber } = getState().pages;
    
    dispatch(setLoading(true));
    return ():any =>
      jsonApi.getShipmentsByPage(pageNumber)
        .then((res:TShipmentsFromServer) => {
            dispatch(setQuantity(res.qty));
            dispatch(setShipments(res.data));
            dispatch(setLoading(false));
        })
        .catch(e => {
          console.error(e);
        });
  };
};


export const fetchAllData: FetchDatafunc=()=>{
  return function(dispatch, getState) {    
    dispatch(setLoading(true));
    return ():any =>
      jsonApi.getAllShipments()
        .then((res:TShipmentsFromServer) => {
            dispatch(setQuantity(res.qty));
            dispatch(setShipments(res.data));
            dispatch(setLoading(false));
        })
        .catch(e => {
        
          console.error(e);
        });
  };
}

