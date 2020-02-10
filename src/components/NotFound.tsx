import * as React from 'react';
import { Typography, Link } from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
 
const NotFound: React.FC<{}> = ()=>{
    return (
        <>
            <Typography variant="body2">
                The page you are looking for doesn't work properly
            </Typography>
            <Link>
                <RouterLink to='/'>
                    Go Home
                </RouterLink>
            </Link>
        </>
    )
}

export default NotFound