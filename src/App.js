import React, { useState } from 'react';
import './App.css';
import MyTable from './Task2/MyTable';
import { elements } from './Task2/Elements';
import { Routes, Route } from 'react-router-dom';
import EditForm from './Task2/EditForm';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast'
import AddRow from './Task2/AddRow';
import '@mantine/core/styles.css';

function App() {
  
  const [elements, setElements] = useState([]);
  const [data, setData] = useState(elements);

  // useEffect(() => {
  //     Axios.get('http://127.0.0.1:5000/get_users')
  //         .then(response => {
  //             setElements(response.data);
  //         })
  //         .catch(error => {
  //             console.error('Error fetching data:', error);
  //             toast.error('Error fetching data');
  //         });
  // }, []);
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<MyTable elements={data} setElements={setData} />} />
        <Route path='/add' element={<AddRow elements={data} setElements={setData} />} />
        <Route path='/edit/:id' element={<EditForm elements={data} setElements={setData}></EditForm>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
