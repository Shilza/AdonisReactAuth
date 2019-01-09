import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as AuthService from "../../services/auth";
import styles from './home.module.css';

const Home = props => {
    return (
        <>
            <div className={styles.header}>
                <button
                    className={styles.logout}
                    onClick={props.logout}
                >
                    Logout
                </button>
            </div>
            <div className={styles.container}>
                <h1>Homepage</h1>
            </div>
        </>
    );
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        logout: AuthService.logout
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(Home);