import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import {TextField, Button, Paper, Typography, makeStyles, Theme, createStyles} from '@material-ui/core'
import { connect, compose } from 'react-redux'
import { IState } from '../interfaces'
import {RouteComponentProps} from 'react-router-dom'
import { editShipmentWithId } from '../store'


interface IComponentProps extends RouteComponentProps<{}> {

}

interface IStateProps {
    itemValues: any
    formValues: any
    editShippingItem: (id: number, shipmentDetails: any)=>void
}

interface IProps extends IComponentProps, IStateProps{
    
}


export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  
    paper: {
      marginBottom: theme.spacing(2),
      padding: 15
    },
    form: {
      width: 500
    },
    button: {
      margin: 15
    },
    type: {
      margin: '15px 0'
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

const validate = values => {
    const errors = {}
    const requiredFields = [
      'name',
      'destination',
      'mode',
      'origin',
      'type'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    
    return errors
  }
// @ts-ignore
export const EditShipmentFormDisconnected: React.FC<IProps> = ({editShippingItem, match, formValues, itemValues , history, ...rest})=>{
    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        editShippingItem(match.params.id, formValues.values);
        history.replace('/')
    }

    const handleFormCancel = ()=>{
      history.replace('/')
    }

    const classes = useStyles();
    return (
        <form onSubmit={handleFormSubmit} className={classes.form}>
          <Paper elevation={3} className={classes.paper} >
            <Typography component='h3'> 
                  ID: {itemValues.id}
            </Typography>
            <div>
                <Field
                    name="name"
                    component={renderTextField}
                    label="First Name"
                />
            </div>
            <div>
                <Field
                    name="destination"
                    component={renderTextField}
                    label="Destination"
                />
            </div>
            <div>
                <Field
                    name="origin"
                    component={renderTextField}
                    label="Origin"
                />
            </div>
            <Typography component='h3' className={classes.type}> 
                Type: {itemValues.type}
            </Typography>
            <Button disabled={(formValues && (!formValues.anyTouched || !!formValues.syncErrors ))} type='submit' variant='contained' className={classes.button}> Change</Button>
            <Button type='reset' variant='text' onClick={handleFormCancel}> Cancel</Button>
          </Paper>
        </form>
    )
}


const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )


const mapStateToProps :(state: IState, ownProps : RouteComponentProps)=>{itemValues: object, formValues: object} = (state, ownProps)=>{
  const itemValues = state.shipments.data[ownProps.match.params.id];
  return({
      itemValues,
      formValues: state.form.editShipping,
      initialValues: itemValues
    })
  }

const mapDispatchToProps =  (dispatch) =>({
    editShippingItem: (id, shipmentDetails)=>dispatch(editShipmentWithId({id, shipmentDetails}))
})



export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'editShipping',
    validate
  })(EditShipmentFormDisconnected)
)
