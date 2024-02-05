import React, { useState } from 'react';
import './App.css';
import MyTable from './Task2/MyTable';
import { Routes, Route } from 'react-router-dom';
import EditForm from './Task2/EditForm';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast'
import AddRow from './Task2/AddRow';
import '@mantine/core/styles.css';
import EditFormNew from './Task2/EditFormNew';

function App() {

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<MyTable />} />
        <Route path='/add' element={<AddRow />} />
        <Route path='/edit/:id' element={<EditForm></EditForm>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
