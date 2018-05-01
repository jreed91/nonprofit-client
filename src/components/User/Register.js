import React from 'react';
import './Register.css';
import { Input } from 'semantic-ui-react'
import { handleResponse } from '../../helper';
import { FormErrors } from './FormErrors';
import { Container, Dimmer, Loader, Segment, Item, Label, Header, Button, Checkbox, Form } from 'semantic-ui-react';
import { API_URL } from '../../config';
import Auth  from '../../common/Auth/Auth';

const auth = new Auth();

class Register extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            formErrors: { email: ''},
            emailValid: true,
            formValid: true,
            loading: false,
            success: false,
            errorMessage: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        switch (fieldName) {
            case 'email':
                emailValid = regEx.test(value);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid});
    }

    handleSubmit() {
        this.setState({ loading: true });

        
        auth.sendEmail(this.state.email);
        
    }


    render() {
        const { loading, success } = this.state;

        return (
            <Container>
                <FormErrors formErrors={this.state.formErrors} />
                <Form error={this.state.formValid} onSubmit={() => this.handleSubmit()} loading={loading} >

                    <Form.Field required>
                        <Form.Input label='Email' placeholder='Email' type='email' name='email' onChange={(event) => this.handleUserInput(event)} error={!this.state.emailValid} />
                    </Form.Field>
                    <Button type='submit'>Send Me a Magic Link</Button>
                </Form>
            </Container >
        )
    }
}

export default Register;