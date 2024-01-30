import { Table, Button } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast'

const MyTable = ({ elements, setElements }) => {
    const [localElements, setLocalElements] = useState(elements);

    const handleDelete = (id) => {
        const updatedElements = localElements.filter((element) => element.id !== id);
        setLocalElements(updatedElements);
        setElements(updatedElements);
        toast.success("Deleted row successfuly")
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
        <div>
            <h2 style={{ 'textAlign': 'center' }}>MANTINE TABLE </h2>
            <Link to='/add' className="btn btn-primary" style={{ display: 'flex', justifyContent: 'center', 'marginLeft':"46%",width: 'fit-content' }}>
                Add new entry
            </Link>

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
        </div>
    );
};

export default MyTable;