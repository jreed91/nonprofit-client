import React from 'react';
import './Detail.css';
import { Input } from 'semantic-ui-react'
import { handleResponse } from '../../helper';
import { Grid, Container, Dimmer, Loader, Segment, Button, Icon, Image, Item, Label, Header } from 'semantic-ui-react';
import { API_URL } from '../../config';
import task_icon from '../List/task.png';

class Detail extends React.Component {
    constructor() {
        super();

        this.state = {
            project: {},
            organization: {},
            loading: false,
            error: null,
        }
    }

    componentDidMount() {
        const project_id = this.props.match.params.project_id;

        this.fetchProject(project_id);
        this.fetchOrganization.bind(this);
    }

    fetchProject(project_id) {
        this.setState({ loading: true });

        fetch(`${API_URL}/projects/${project_id}`)
            .then(handleResponse)
            .then((data) => {
                this.setState({ project: data.payload, loading: false });
                this.fetchOrganization(data.payload.organization_id)
            })
            .catch((error) => {
                this.setState({ error: error, loading: false });
            });
    }

    fetchOrganization(organization_id) {
        this.setState({ loading: true });

        fetch(`${API_URL}/organizations/${organization_id}`)
            .then(handleResponse)
            .then((data) => {
                this.setState({ organization: data.payload, loading: false });
            })
            .catch((error) => {
                this.setState({ error: error, loading: false });
            });
    }



    render() {
        const { loading, project, error , organization } = this.state;

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
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}>
                        <Image src={task_icon} />
                        </Grid.Column>
                        <Grid.Column width={13}>
                           <Header as='h1'>{project.name}</Header>
                           <p>{project.description}</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Header as='h2'>{organization.name}</Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Container>
                )
            }
        }
        
export default Detail;