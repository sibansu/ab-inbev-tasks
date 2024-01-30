import { Table, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast'

const MyTable = ({ elements, setElements }) => {

    const handleDelete = (id) => {
        const updatedElements = elements.filter((element) => element.id !== id);
        setElements(updatedElements);
        toast.success("Deleted row successfuly")
    };

    const rows = elements.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td style={{ padding: '8px' }}>{element.id}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>{element.fullName}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>{element.dob}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>{element.email}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>{element.mobileNumber}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>{element.roles.join(', ')}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>{element.state}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>{element.city}</Table.Td>
            <Table.Td style={{ padding: '8px' }}>
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
        <div className='d-flex flex-column align-items-center justify-content-around'>
            <h2 style={{ 'textAlign': 'center' }}>MANTINE TABLE </h2>
            <Link to='/add' className="btn btn-primary" >
                Add new entry
            </Link>

            <Table className='' style={{ marginTop: '20px' }}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th className='text-center'>ID</Table.Th>
                        <Table.Th className='text-center'>Full Name</Table.Th>
                        <Table.Th className='text-center'>Date of Birth</Table.Th>
                        <Table.Th className='text-center'>Email</Table.Th>
                        <Table.Th className='text-center'>Mobile Number</Table.Th>
                        <Table.Th className='text-center'>Roles</Table.Th>
                        <Table.Th className='text-center'>State</Table.Th>
                        <Table.Th className='text-center'>City</Table.Th>
                        <Table.Th className='text-center'>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </div>
    );
};

export default MyTable;