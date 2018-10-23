import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { updateObject, checkValidity } from '../../shared/Utility'
import * as action from '../../Store/Action/index' 
import { ToastContainer, toast } from 'react-toastify'


class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                label: 'Email',
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                label: 'Password',
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
            }
        }
    }

    // componentDidMount() {
    //     if (this.props.authRedirectPath !== '/') {
    //         this.props.onSetAuthRedirectPath();
    //     }
    // }

    inputChangedHandler = (event, controlName) => {
        const updateControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        })
        this.setState({ controls: updateControls })
    }

    submitHandler = (event) => {
        console.log('clicked')
        event.preventDefault();
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        }
        console.log(authData)
        this.props.onAuth(authData);
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let isDisabled = true;
        
        if (this.state.controls.email.value !== '' && this.state.controls.password.value !== '') {
            isDisabled = false
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                label={formElement.config.label}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        if (this.props.loading) {
            // form = <Spinner />
        }

        if (this.props.error) {
            if (this.props.error.response.status === 400) {
                toast.error('Email Or Password Incorrect');
                this.props.triggerAuthStart();
            }
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            // toast.success('auth success')
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div>
                <ToastContainer />
                {authRedirect}
                <div className="container">
                    <div className="card card-login mx-auto mt-5">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={this.submitHandler}>
                                <div className="form-group">
                                    {form}
                                </div>
                                <Button disabled={isDisabled}>SUBMIT</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerAuthStart: () => dispatch(action.authStart()),
        onAuth: (authData) => dispatch(action.auth(authData)),
        onSetAuthRedirectPath: () => dispatch(action.setAuthRedirectPath('/'))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
