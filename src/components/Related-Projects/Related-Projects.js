import React from 'react';
import {Link} from 'react-router-dom';
import { handleResponse } from '../../helper';
import { API_URL } from '../../config';
import { Container, Dimmer, Loader, Segment, Button, Icon, Image as ImageComponent, Item, Label, Header} from 'semantic-ui-react';


class RelatedProjects extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            projects: [],
            error: null,
            organization_id: this.props.organization_id
        };
    }

    componentDidMount() {
        this.fetchRelatedProjects(this.state.organization_id);
    }

    fetchRelatedProjects(organization_id) {
        this.setState({ loading: true });

        fetch(`${API_URL}/organizations/${organization_id}/projects`)
            .then(handleResponse)
            .then((data) => {
                console.log(data);
                this.setState({ projects: data.payload, loading: false });
            })
            .catch((error) => {
                this.setState({ error: error, loading: false });
            });
    }


    render() {
        const { loading, projects, error } = this.state;

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
            <div>
            <Header as='h2'>Related Projects</Header>
            <Item.Group>
                {projects.map((project) => (
                            <Item key={project._id}>
                                <Item.Content>
                                    <Item.Header as='a'>{project.name}</Item.Header>
                                        <Link to={`/projects/${project._id}`} >
                                        <Button primary floated='right'>
                                            See Details
                                        <Icon name='right chevron' />
                                        </Button>
                                        </Link>
                                </Item.Content>
                            </Item>
                    ))}
            </Item.Group>
            </div>
        );
    }
}

export default RelatedProjects;