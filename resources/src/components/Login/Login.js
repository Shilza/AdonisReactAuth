import {
    Button,
    Form, Icon, Spin
} from 'antd';
import React from "react";
import {bindActionCreators} from "redux";
import * as AuthService from "../../services/auth";
import {connect} from "react-redux";
import {message} from "antd/lib/index";
import {Link, withRouter} from 'react-router-dom';
import Password from "../Fields/Password";
import Remember from "../Fields/Remember";
import Username from "../Fields/Username";
import FormItem from "antd/es/form/FormItem";
import styles from './login.module.css';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            remember: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeRemember = this.changeRemember.bind(this);
    }

    changeRemember() {
        this.setState((prevState) => ({remember: !prevState.remember}));
    }

    handleSubmit(e) {
        e.preventDefault();
        const {form, login, history} = this.props;
        const {remember} = this.state;

        form.validateFields((err, {username, password}) => {
            if (!err) {
                this.setState({loading: true});
                login({username, password, remember})
                    .then(() => history.push('/home'))
                    .catch(err => {
                        this.setState({loading: false});
                        message.error(err.response.data.message);
                    });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;
        const {remember} = this.state;

        return (
            <Spin spinning={this.state.loading} indicator={antIcon}>
                <h1 style={{textAlign: 'center'}}>Login</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Username getFieldDecorator={getFieldDecorator}/>
                    <Password
                        getFieldDecorator={getFieldDecorator}
                        validator={this.validateToNextPassword}
                    />
                    <FormItem>
                        <div className={styles.rememberForgotContainer}>
                            <Remember getFieldDecorator={getFieldDecorator}
                                      remember={remember}
                                      onChange={this.changeRemember}
                            />
                            <Link to={'/password-reset'}>Forgot password</Link>
                        </div>
                        <div className={styles.loginRegisterContainer}>
                            <Button className={styles.login}
                                    type="primary"
                                    htmlType="submit"
                            >
                                Log in
                            </Button>
                            <Link to={'/register'}>Register now!</Link>
                        </div>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        login: AuthService.login,
    }, dispatch);
};

export default Form.create()(connect(null, mapDispatchToProps)(withRouter(Login)));