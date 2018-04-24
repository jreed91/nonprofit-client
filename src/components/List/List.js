import React from 'react';
import {Link} from 'react-router-dom';
import './List.css';
import { handleResponse } from '../../helper';
import { API_URL } from '../../config';
import { Container, Dimmer, Loader, Segment, Button, Icon, Image as ImageComponent, Item, Label, Header } from 'semantic-ui-react';
import task_icon from './task.png';


class List extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: false,
            projects: [],
            organization: {},
            error: null,
        };
    }

    componentDidMount() {
        this.fetchProjects();
    }

    fetchProjects() {
        this.setState({ loading: true });

        fetch(`${API_URL}/projects`)
            .then(handleResponse)
            .then((data) => {
                this.setState({ projects: data.payload, loading: false });
            })
            .catch((error) => {
                this.setState({ error: error, loading: false });
            });
    }

    fetchOrganzation(organization_id) {
        this.setState({ loading: true });

        fetch(`${API_URL}/organizations/${organization_id}`)
            .then(handleResponse)
            .then((data) => {
                this.setState({ organization: data.payload, loading: false });
            })
            .catch((error) => {
                this.setState({ error: error.title, loading: false });
            });
    }


    render() {
        const { loading, projects, organization, error } = this.state;

        if (loading) {
            return (
                <div>
                    <Dimmer active>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                </div>
            )
        }

        if (error) {
            return <div className="error">{error}</div>
        }

        return (
            <Container>
                <Header as='h1'>Available Projects</Header>
                <Item.Group divided>
                    {projects.map((project) => (
                            <Item key={project._id}>
                                <Item.Image src={task_icon} />
                                <Item.Content>
                                    <Item.Header as='a'>{project.name}</Item.Header>
                                    <Item.Meta>
                                    <span>{organization.name}</span>
                                    </Item.Meta>
                                    <Item.Description>{project.description}</Item.Description>
                                    <Item.Extra>
                                        <Link to={`/projects/${project._id}`} >
                                        <Button primary floated='right'>
                                            Volunteer to Help!
                                        <Icon name='right chevron' />
                                        </Button>
                                        </Link>
                                        {project.skills.map((skill, index) => {
                                            return (
                                                <Label key={skill.name}>{skill.name}</Label>
                                            )
                                        })}
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                    ))}
                </Item.Group>
            </Container>
        );
    }
}

export default List;