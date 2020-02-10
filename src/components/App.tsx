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
import { Typography } from "@material-ui/core";

//const reactLogo = require("./../assets/img/react_logo.svg");
//import "./../assets/scss/App.scss";

class App extends React.Component<{getShipments: ()=>Promise<void>}, undefined> {
    componentDidMount(){
        console.log('this.props', this.props)
        this.props.getShipments()
    }

    public render() {
        
        return (
            <div className='app_wrapper'>
                <Provider store={store}>
                    <Typography variant='h2' color='primary'>
                        Welcome to ur shippings app
                    </Typography>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={TableBody}/>
                            <Route path="/edit/:id" component={ShippingItem}/>                      
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
    shipments: state.shipments
})

const mapDispatchToProps = (dispatch: Dispatch):{
    getShipments: any
} =>{
    return {
        //@ts-ignore
        getShipments: dispatch(fetchAllData())

    }
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const Root = () => <Provider store={store}><ConnectedApp/></Provider>

export default hot(module)(Root);
