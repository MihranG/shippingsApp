import { configureStore, createSlice, EnhancedStore } from "@reduxjs/toolkit";
import { combineReducers, CombinedState } from "redux";
import { reducer as formReducer } from 'redux-form'

import { IState } from "./interfaces";

const initialShipmentStoreState = {
  data: {},
  isLoading: false,
};

const shipmentsSlice = createSlice({
  name: "shipments",
  initialState: initialShipmentStoreState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setShipments(state, action) {
        const shipmentsNormalized = {};
        action.payload.forEach(shipment => {
          const {id} = shipment;
          shipmentsNormalized[id] = shipment;
        });
        state.data = shipmentsNormalized;
    },
    editShipmentWithId(state, action){
        const {id, shipmentDetails} = action.payload;
        state.data[id] = shipmentDetails;
    },
    deleteShipments(state, action){
      state.data = {}
    }
  }
});

const pagesSlice = createSlice({// this slice was intended to use for table, but as I used it only in table component didn't have time to delete )))
  name: "pages",
  initialState: { pageNumber: 1, pagesQuantity: null },
  reducers: {
    setData(state, action) {
      state.pageNumber = action.payload;
    },
    setQuantity(state, action) {
      state.pagesQuantity = Math.ceil(action.payload/20)
    }
  }
});


const rootReducer = combineReducers({
  pages: pagesSlice.reducer,
  shipments: shipmentsSlice.reducer,
  form: formReducer
});

export const store :EnhancedStore<CombinedState<IState>>= configureStore({
  reducer: rootReducer
});

export const {
  actions: { setLoading, setShipments, editShipmentWithId },
  reducer: shipmentsReducer
} = shipmentsSlice;

export const {
  actions: { setData, setQuantity },
  reducer: pagesReducer
} = pagesSlice;
