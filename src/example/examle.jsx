import React, { Component } from "react";
import Pagination from '../component/index';

class Users extends Component {
    render() {
        return (
            <React.Fragment>
                <h2>Users</h2>
                <Pagination
                    initialPage={1}
                    items={300}
                    onChangePage={(index) => console.log(index)}
                />
            </React.Fragment>
        );
    }
}

export default Users;
