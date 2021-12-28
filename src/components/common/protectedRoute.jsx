import React from 'react';
// import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({component: Component, children, ...rest}) => {
    const {currentUser} = useAuth();
    console.log('Cur usr', currentUser);

    return (
        <Route {...rest}
            render={(props) => {
                if (!currentUser) {
                    console.log('Redirecting....', currentUser);
                    return (
                        <Redirect to={{
                            pathname: '/login',
                            state: {from: props.location}
                        }}/>
                    );
                }

                return Component
                    ? (<Component {...props}/>)
                    : children;
            }}
        />
    );
};

// PropTypes.propTypes = {
//     component: PropTypes.func,
//     children: PropTypes.oneOfType(
//         [PropTypes.arrayOf(PropTypes.node), PropTypes.node]
//     )
// };

export default ProtectedRoute;
