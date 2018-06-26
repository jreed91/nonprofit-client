import React from 'react';
import { Container, Dimmer, Loader, Header, Button, Form, Modal, Image, Icon } from 'semantic-ui-react';
import './VolunteerModal.css';
import Auth from '../Auth/Auth';
import { API_URL } from '../../config';


class VolunteerModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            signedUp: false,
        }

        this.signUp = this.signUp.bind(this);
    }

    signUp() {
        this.setState({ loading: true })
        const body = {};
        body['project_id'] = this.props.project._id;
        body['sub'] = localStorage.getItem('sub')
        fetch(`${API_URL}/projects/addVolunteer`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "same-origin"
          }).then(function(response) {
            response.status     //=> number 100–599
            response.statusText //=> String
            response.headers    //=> Headers
            response.url        //=> String
          }, function(error) {
            error.message //=> String
          })
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const { loading, signedUp } = this.state;
        return (
            <div>
                {
                    !isAuthenticated() && (
                        <Modal  size='tiny' trigger={<Button>Volunteer To Help</Button>}>
                            <Modal.Header>Sign in or Sign Up</Modal.Header>
                            <Modal.Content>
                            
                                    <Header>Click Below!</Header>
                                    </Modal.Content>
                                <Modal.Actions>
                                    <a href={`/Register`}>
                                        <Button >Click Here to Sign In or Sign Up</Button>
                                    </a>
                                </Modal.Actions>
                        </Modal>
                    )
                }
                {
                    isAuthenticated() && (
                        <Modal size='tiny' trigger={<Button>Volunteer To Help</Button>}>
                            <Modal.Header>Verify</Modal.Header>
                            <Modal.Content>
                                    <Header>Yes Volunteer My Help!</Header>
                                    </Modal.Content>
                                <Modal.Actions>
                                <Button loading={loading} positive icon='checkmark'  labelPosition='right' content='Yes' onClick={this.signUp}>Sign Up! <Icon name='checkmark' /> </Button>
                                </Modal.Actions>

                        </Modal>
                    )
                }
            </div>
        )
    }

}

export default VolunteerModal;