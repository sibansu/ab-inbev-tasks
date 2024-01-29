import React, { useState } from 'react';
import './App.css';
import MyTable from './Task2/MyTable';
import { elements } from './Task2/Elements';
import { Routes, Route } from 'react-router-dom';
import EditForm from './Task2/EditForm';

function App() {
  const [data, setData] = useState(elements);
  return (
    <Routes>
      <Route path='/' element={<MyTable elements={data} setElements={setData} />} />
      <Route path='/edit/:id' element={<EditForm elements={data} setElements={setData}></EditForm>} />
    </Routes>
  );
}

export default App;
