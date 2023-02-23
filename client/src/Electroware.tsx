import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";

import "./Electroware.css";

function Electroware() {
    return (
        <div className="electroware">
            <Header />
        </div>
    );
}

export default Electroware;
