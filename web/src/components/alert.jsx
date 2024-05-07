import { Alert } from 'keep-react';
import React from 'react';

/**
 * 
 * @param {status} param0 : string - Determines what the alert is for (success, error, warning)
 * 
 */
const AlertComponent = ({status, type}) => {
    if(status === 'success') {
        return (
        <Alert color="success">
            <Alert.Container>
                <Alert.Icon />
                <Alert.Title>{type} successfully added.</Alert.Title>
            </Alert.Container>
            <Alert.Dismiss />
        </Alert>
        )
    }
    else if(status === 'error'){
        return(
            <Alert color="danger">
                <Alert.Container>
                    <Alert.Icon />
                    <Alert.Title>{type} could not be updated.</Alert.Title>
                </Alert.Container>
                <Alert.Dismiss />
            </Alert>
        )
    }
}

export default AlertComponent;