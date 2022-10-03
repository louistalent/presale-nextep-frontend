
import './App.css';
import Layout from './Components/global/Layout';
import Admin from './Components/sections/admin';
import Error from './Components/global/error';
import react, { useEffect, useState } from "react";
import BlockchainProvider from "./context";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { BrowserRouter as Router, Routes, Route, Navigate, HashRouter } from "react-router-dom";
// import { HashRouter, Route, Routes, RouterProvider } from "react-router-dom";
import "./Assets/css/app.css"
import "./Assets/css/custom.css"
import "./Assets/css/mycss.css"

function App() {

  return (
    <>
      <BlockchainProvider>

        <Router>
          <Routes>
            <Route path='*' element={<Error />} />
            <Route path='/page-not-found' element={<Error />} />
            <Route path='/start-presale' element={<Layout />} />
            <Route path='/admin-page-for-new-link' element={<Admin />} />
            <Route path='/' element={<Error />} />
          </Routes>
          {/* <Layout /> */}
        </Router>
      </BlockchainProvider>
      <NotificationContainer />
    </>
  );

}

export default App;
