import React from 'react';
import './Search.css';
import { Input } from 'semantic-ui-react'
import { handleResponse } from '../../helper';
import { API_URL } from '../../config';

class Search extends React.Component {


    render() {
        return (
            <div>
                 <Input focus placeholder='Search...' />
            </div>
        )
    }
}

export default Search;