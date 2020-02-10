import { shallow, mount } from 'enzyme';
import {Root, AppDisconnected} from './App';
import {data as mockShipmentsData} from '../mockShipmentData';
import * as React from 'react';
import TableRow from '@material-ui/core/TableRow';
import ShipmentsPage from './HeaderComponent'
import {BrowserRouter} from 'react-router-dom'
import ShipmentPage from './HeaderComponent';
import ShippingItem from './ShippingItem';
import TableBody from './table/TableBody';
import { TableHead } from '@material-ui/core';


describe('App component shallow', ()=>{
    let wrapper;
    
    const getShipments = jest.fn((x)=>x)
    beforeAll(()=>{
        // @ts-ignore
        wrapper = shallow(<AppDisconnected  getShipments= {getShipments}/>,);
    }),
    test('should match snapshot',()=>{
        expect(wrapper).toMatchSnapshot()
    })
    test('should call getShipments() methid in first load', ()=>{
        expect(getShipments.mock.calls.length).toEqual(1)
    })

    afterAll(()=>{
        wrapper.detach()
    })
    
})

describe('All app',()=>{
    let wrapper;
    beforeAll(()=>{
        // const mockResponse = mockData;
        const mockJsonPromise = Promise.resolve(mockShipmentsData);
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
          });
        // @ts-ignore
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    })
   
    beforeAll(()=>{
        wrapper = mount(<Root />)
    })

    test('should match snapshot', ()=>{
        expect(wrapper).toMatchSnapshot()
    })

    test('should depict table with appropriate initial routing', ()=>{
        const router = wrapper.find(BrowserRouter);
        const table = wrapper.find(TableBody);
        const rowQty = table.find(TableHead)
        const itemPage = wrapper.find(ShippingItem);
        
        expect(router.length).toBe(1);
        expect(table.length).toBe(1);
        expect(itemPage.length).toBe(0);
        expect(rowQty.length).toBe(0);
    })

    afterAll(()=>{
        // @ts-ignore
        global.fetch.mockClear();
        // @ts-ignore
        delete global.fetch;
        wrapper.detach()
    })
})