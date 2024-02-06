import { Table, Button, Input } from '@mantine/core';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react';
import axios from 'axios'
const MyTable = () => {
    const [elements, setElements] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/get_users')
            .then(response => {
                setElements(response.data);
                console.log("Table data", response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data');
            });
    }, []);
    const handleDelete = (id, fullName) => {
        axios.delete(`http://127.0.0.1:5000/delete_user/${id}`)
            .then(response => {
                if (response.status === 200) {
                    const updatedElements = elements.filter((element) => element.id !== id);
                    setElements(updatedElements);
                    toast.success(`Deleted row successfully`);
                } else {
                    toast.error(response.data.error || 'Failed to delete the row.');
                }
            })
            .catch(error => {
                console.error('Error deleting row:', error);
                toast.error('An error occurred while deleting the row.');
            });
    };
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRows = elements.filter((element) =>
        element.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const rows = filteredRows.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td style={{ padding: '8px' }}>{element.id}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>{element.fullName}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>{element.dob}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>{element.email}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>{element.mobileNumber}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>{element.roles}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>{element.state}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>{element.city}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>
                <Link to={`/edit/${element.id}`}>
                    <Button variant="filled" color="violet">
                        Edit
                    </Button>
                </Link>
                <Button
                    onClick={() => handleDelete(element.id)} variant="filled" color="red" style={{ marginLeft: '8px' }}
                >
                    Delete
                </Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div className='d-flex flex-column align-items-center justify-content-around'>
            <div className='container mt-3' style={{ display: 'flex', justifyContent: 'space-between', width: '100vw' }}>
                <div style={{ marginBottom: '20px' }}>
                    <Input
                        type="text"
                        radius='lg'
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <h2 style={{ 'textAlign': 'center' }}>MANTINE TABLE </h2>
                <Link to='/add'>
                    <Button variant="filled" color="pink" size='md'>
                        Add a row
                    </Button>
                </Link>
            </div>
            {
                elements.length ? (
                    <Table striped highlightOnHover style={{ marginTop: '20px' }}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th >ID</Table.Th>
                                <Table.Th >Full Name</Table.Th>
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
                ) : (
                    <h2>No rows to render</h2>
                )
            }
        </div>
    );
};

export default MyTable;