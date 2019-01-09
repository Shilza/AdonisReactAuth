import React from 'react'
import {Route, Redirect} from 'react-router'
import {connect} from 'react-redux'

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <main>
                <Component {...props}/>
            </main>
        ) : (
            <Redirect to={{
                pathname: '/',
                state: {from: props.location}
            }}/>
        )
    )}/>
);

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.isAuthenticated
    }
};

export default connect(mapStateToProps)(PrivateRoute);