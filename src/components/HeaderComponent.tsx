import * as React from 'react';
import { Typography, TextField } from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import {Search} from '@material-ui/icons';
import {connect} from 'react-redux';
import { IShipment } from '../interfaces';
import {RouteComponentProps} from 'react-router-dom'


const Header: React.FC<{shipments: IShipment[]} & RouteComponentProps<{}>> = ({shipments, history}) =>{
    const handler = (event: React.MouseEvent<unknown>, properties: IShipment) =>{
        history.push('/edit/'+ properties.id)
    }
    return( <div className='app_header'>
                <Typography variant='h2' color='primary'>
                    Welcome to our shippings app
                </Typography>
                <Autocomplete
                    id="searchById"
                    popupIcon={<Search/>}
                    forcePopupIcon={false}
                    options={shipments}
                    getOptionLabel={(option: IShipment) => option.id}
                    className='search_bar'
                    onChange={(e, params)=>handler(e,params)}
                    renderInput={params =>
                        <TextField {...params} label="type an ID to Search for a shipment" variant="outlined" fullWidth />
                    }
                />
            </div>)
} 


const mapStateToProps = (state)=>({
    shipments: Object.values(state.shipments.data)
})

export default connect(mapStateToProps)(Header)