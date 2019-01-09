import React from "react";
import Login from "../../components/Login/Login";
import {Card} from 'antd';
import styles from './welcome.module.css';

const Welcome = props => {
    return (
        <div className={styles.welcome}>
            <Card className={styles.card}>
                {props.children}
            </Card>
        </div>
    )
};

Welcome.defaultProps = {
    children: <Login/>
};

export default Welcome;