import React from 'react';
import './Detail.css';
import { Input } from 'semantic-ui-react'
import { handleResponse } from '../../helper';
import { Grid, Container, Dimmer, Loader, Segment, Button, Icon, Image, Item, Label, Header, Link } from 'semantic-ui-react';
import { API_URL } from '../../config';
import task_icon from '../Project-List/task.png';
import VolunteerModal from '../../common/VolunteerModal/VolunteerModal';
import RelatedProjects from '../Related-Projects/Related-Projects';

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: {},
            organization: {},
            organization_id: '',
            loading: false,
            error: null,
            skills: []
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
                this.setState({ project: data.payload, skills: data.payload.skills, loading: false });
                this.fetchOrganization(data.payload.organization_id);
                this.setState({ organization_id: data.payload.organization_id})
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
        const { loading, project, error, organization, skills } = this.state;
        

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
                        <Grid.Column  width={6}>Skills Needed:&nbsp;&nbsp;
                        {skills.map((skill, index) => {
                                            return (
                                                <Label key={skill.name}>{skill.name}</Label>
                                            )
                                        })}
                                         </Grid.Column>
                                         <Grid.Column floated='right' width={3}>
                            <VolunteerModal {...this.props} project={project} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Header as='h2'>{organization.name}</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Image src={organization.orgThumbnail} />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Header as='h3'>About Us</Header>
                            <p>{organization.aboutUs}</p>
                        </Grid.Column>
                        <Grid.Column width={6} floated='right'>
                            <RelatedProjects organization_id={this.state.organization_id}></RelatedProjects>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default Detail;