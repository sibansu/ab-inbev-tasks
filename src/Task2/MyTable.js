import { Table, Button } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MyTable = ({ elements, setElements }) => {
    const [localElements, setLocalElements] = useState(elements);

    const handleDelete = (id) => {
        const updatedElements = localElements.filter((element) => element.id !== id);
        setLocalElements(updatedElements);
    };

    const rows = localElements.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>{element.id}</Table.Td>
            <Table.Td>{element.fullName}</Table.Td>
            <Table.Td>{element.dob}</Table.Td>
            <Table.Td>{element.email}</Table.Td>
            <Table.Td>{element.mobileNumber}</Table.Td>
            <Table.Td>{element.roles.join(', ')}</Table.Td>
            <Table.Td>{element.state}</Table.Td>
            <Table.Td>{element.city}</Table.Td>
            <Table.Td>
                <Link className="btn btn-primary" to={`/edit/${element.id}`}>
                    Edit
                </Link>
                <Button
                    onClick={() => handleDelete(element.id)}
                    className="btn btn-danger"
                    variant="outline"
                    color="red"
                    style={{ marginLeft: '8px' }}
                >
                    Delete
                </Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table className='container' style={{ marginTop: '20px' }}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Full Name</Table.Th>
                    <Table.Th>Date of Birth</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Mobile Number</Table.Th>
                    <Table.Th>Roles</Table.Th>
                    <Table.Th>State</Table.Th>
                    <Table.Th>City</Table.Th>
                    <Table.Th>Actions</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
};

export default MyTable;