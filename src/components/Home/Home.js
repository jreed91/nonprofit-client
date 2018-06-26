import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import { API_URL } from '../../config';
import { Container, Dimmer, Loader, Segment, Button, Icon, Image, Item, Label, Header } from 'semantic-ui-react';
import tech_icon from './TechIcon.png';


class Home extends React.Component {



    constructor() {
        super();
    }

    

    render() {

        var segmentStyles = {
            minHeight: '700px',
            padding: '1em 0em',
            marginTop: '-50px',
            zIndex: '-1'
        }
        var imageStyles = {
            marginTop: '100px'
        }

        return (
            <Segment inverted color='black' style={segmentStyles}>
             <Image src={tech_icon} centered size='medium' style={imageStyles}/>
                <Header as='h1' size='huge' textAlign='center' >
                    <Header.Content >
                        Give Back, Grow, Learn
                        
                    </Header.Content>
                </Header>
                <Header as='h3' color='grey' textAlign='center' >
                    <Header.Content >
                        Join a community of tech enthusiasts who are giving back to non-profits in need.
                    </Header.Content>
                </Header>
                <Segment basic textAlign='center'>
                <Button size='big' inverted onClick={this.redirect('/Register')}>Join Now</Button>
                </Segment>
            </Segment>
        )
    }
}


export default Home;