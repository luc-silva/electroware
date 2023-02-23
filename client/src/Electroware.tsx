import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";

import "./Electroware.css";
import { Login } from "./pages/Login";

function Electroware() {
    return (
        <div className="electroware">
            <Router>
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />}/>
                </Routes>
            </Router>
        </div>
    );
}

export default Electroware;
