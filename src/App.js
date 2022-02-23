import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListPhoto from './pages/ListPhoto';
import Detail from './pages/ListPhoto/Detail';
import store from './store';


export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<Detail />} />
          <Route path="/" element={<ListPhoto />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
