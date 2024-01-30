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
  const [data, setData] = useState(elements);

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
