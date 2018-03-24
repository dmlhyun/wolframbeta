import React, { Component } from 'react';
import _ from 'lodash';
import { Table, Header, Row, Cell, HeaderCell } from 'semantic-ui-react';

class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.users
    });
  }

  render() {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Created At</Table.HeaderCell>
            <Table.HeaderCell>Last Login</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

         <Table.Body>
          {_.map(this.state.users, ({ userid, role, createdAt, lastlogin, name }) => (
            <Table.Row key={userid}>
              <Table.Cell>{userid}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{role}</Table.Cell>
              <Table.Cell>{createdAt}</Table.Cell>
              <Table.Cell>{lastlogin}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default UsersTable;
