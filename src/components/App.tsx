import * as React from "react";
import {Dispatch} from 'redux';
import { hot } from "react-hot-loader";
import {Provider, connect} from 'react-redux';
import {store} from '../store'
import { fetchAllData } from "../thunk";
import TableBody  from "./table/TableBody";
//const reactLogo = require("./../assets/img/react_logo.svg");
//import "./../assets/scss/App.scss";

class App extends React.Component<{getShipments: ()=>Promise<void>}, undefined> {
    componentDidMount(){
        console.log('this.props', this.props)
        this.props.getShipments()
    }

    public render() {
        console.log(123, this.props);
        
        return (
            <div className="app">
                <Provider store={store}>
                    <h1>Hello World!</h1>
                    <p>Foo to the barz   2323  d</p>
                    {/* <img src={reactLogo.default} height="480"/> */}
                    <TableBody />
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
