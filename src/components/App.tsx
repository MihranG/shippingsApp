import * as React from "react";
import {Dispatch} from 'redux';
import { hot } from "react-hot-loader";
import {Provider, connect} from 'react-redux';
import {store} from '../store'
import { fetchAllData } from "../thunk";
import TableBody  from "./table/TableBody";
import { BrowserRouter , Switch, Route } from 'react-router-dom'
import ShippingItem from "./ShippingItem";
import NotFound from './NotFound';

import './App.css'
import { IShipment } from "../interfaces";

//const reactLogo = require("./../assets/img/react_logo.svg");
//import "./../assets/scss/App.scss";


interface IProps {
    getShipments: ()=>Promise<void>
    shipments: IShipment[]
}

export class AppDisconnected extends React.Component<IProps, undefined> {
    componentDidMount(){
        this.props.getShipments()
    }

    handleShipmentResultClick(){
        this.props
    }

    public render() {
        const {shipments} = this.props
        return (
            <div className='app_wrapper'>
                <Provider store={store}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={TableBody}/>
                            <Route path="/edit/:id" component={ShippingItem}/>
                            <Route path="*" component= {NotFound}/>                      
                        </Switch>
                    </BrowserRouter >
                </Provider>
            </div>
        );
    }
} 

declare let module: object;

const mapStateToProps = (state)=>({
    page: state.pages,
    shipments: Object.values(state.shipments.data)
})

const mapDispatchToProps = (dispatch: Dispatch):{
    getShipments: any
} =>{
    return {
        //@ts-ignore
        getShipments: dispatch(fetchAllData())
    }
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(AppDisconnected);

export const Root = () => <Provider store={store}><ConnectedApp/></Provider>

export default hot(module)(Root);
