import * as React from 'react';
import { shallow, mount } from 'enzyme';
import ShippingItem from './ShippingItem';
import {data as mockData}  from '../mockShipmentData'
import Provider from 'react-redux/lib/components/Provider';
import configureStore from "redux-mock-store";

import {Button} from '@material-ui/core'



const normalizedData = {};
mockData.forEach(item=>{
  normalizedData[item.id] = item
})



const mockStore = configureStore();
const store = mockStore({
    shipments: {data: normalizedData}
})



describe('shippingItem Component',()=>{
    let wrapper;
    const matchPropMock = {
        params: {
            id: 'S1000' // id of shipping
        }
    }
    beforeAll(()=>{
        wrapper = shallow(
            <Provider store={store}>
                <ShippingItem itemValues={mockData[0]} match={matchPropMock} />
            </Provider>
        )
    })
    test('should match snapshot',()=>{
        expect(wrapper).toMatchSnapshot()
    })
    // TODO write tests for checking redux-form and save behaviour - didn't have time :(
    afterAll(()=>{
        wrapper.detach()
    })
})