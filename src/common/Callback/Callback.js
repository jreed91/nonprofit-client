import React, { Component } from 'react';
import { Container, Dimmer, Loader, Segment, Item, Label, Header, Button, Checkbox, Form } from 'semantic-ui-react';

class Callback extends Component {
    render() {

        return (
            <div>
                <Dimmer active>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
            </div>
        );
    }
}

export default Callback;