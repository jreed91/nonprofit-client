import React from 'react';
import './Detail.css';
import { Input } from 'semantic-ui-react'
import { handleResponse } from '../../helper';
import { Container, Dimmer, Loader, Segment, Button, Icon, Image as ImageComponent, Item, Label, Header } from 'semantic-ui-react';
import { API_URL } from '../../config';

class Detail extends React.Component {
    constructor() {
        super();

        this.state = {
            project: {},
            loading: false,
            error: null,
        }
    }

    componentDidMount() {
        const project_id = this.props.match.params.project_id;

        this.fetchProject(project_id);
    }

    fetchProject(project_id) {
        this.setState({ loading: true });

        fetch(`${API_URL}/projects/${project_id}`)
            .then(handleResponse)
            .then((data) => {
                this.setState({ project: data, loading: false });
            })
            .catch((error) => {
                this.setState({ error: error, loading: false });
            });
    }
    


    render() {
        const { loading, project, error } = this.state;

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
                <Header as='h1'>{project.name}</Header>
                </Container>
        )
    }
}

export default Detail;