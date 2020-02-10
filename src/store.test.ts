import configureStore from "redux-mock-store";
import {
  setLoading,
  setData,
  store as realStore,
  shipmentsReducer,
  setShipments,
  editShipmentWithId
} from "./store";

import {data as mockShipmentData} from './mockShipmentData';

describe("Redux store", () => {

  describe("should have appropriate", () => {
    const mockStore = configureStore();
    const store = mockStore();
    afterEach(() => {
      store.clearActions();
    });

    test("setLoading action", () => {
      store.dispatch(setLoading(true));
      expect(store.getActions()[0]).toEqual({
        payload: true,
        type: "shipments/setLoading"
      });
    });

    test("setShipments action", () => {
      store.dispatch(setShipments(mockShipmentData));
      expect(store.getActions()[0]).toEqual({
        payload: mockShipmentData,
        type: "shipments/setShipments"
      });
      expect(store.getActions()[0]).toMatchSnapshot();
    });


    test('editShipmentWithId action', ()=>{
        store.dispatch(editShipmentWithId({id: 1, shipmentDetails: {data: 'data'}}))
        expect(store.getActions()[0]).toMatchSnapshot();
        expect(store.getActions()[0]).toEqual({
            payload: {id: 1, shipmentDetails: {data: 'data'}},
            type: "shipments/editShipmentWithId"
        })
    })

  });

  describe("should behave appropriate", () => {
    const initialState = realStore.getState();
    describe("when called timePeriodReducer with", () => {
      const ownInitialState = initialState.shipments;
      test("setLoading action", () => {
        expect(ownInitialState.isLoading).toBe(false);
        const newState = shipmentsReducer(ownInitialState, setLoading(true));
        expect(newState.isLoading).toBe(true);
      });

      describe("setShipments action", () => {
        let newState, newStateFirstIndex, newStateFirstEntity;
        beforeAll(()=>{
            expect(ownInitialState.data).toEqual({});
            newState = shipmentsReducer(
                ownInitialState,
                setShipments(mockShipmentData)
            );
            newStateFirstIndex = Object.keys(newState.data)[0];
            newStateFirstEntity = newState.data[Object.keys(newState.data)[0]]
        })
        
        test('which normalizes given array',()=>{
            
            expect(Array.isArray(newState.data)).toBe(false);
            expect(newStateFirstIndex).toBe(mockShipmentData[0].id)
        })
    
        test('returns the right shipments state', ()=>{
            expect(newStateFirstEntity).toEqual(mockShipmentData[0]);
        })
      });
    });
  });
});