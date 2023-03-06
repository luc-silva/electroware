import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { createContext, useContext, useEffect, useState } from "react";

import { Store } from "./pages/Store";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { Product } from "./pages/Product";
import { Faq } from "./pages/Faq";
import { SearchResults } from "./pages/SearchResults";

function Electroware() {
    return (
        <div className="electroware">
            <Router>
                <Header />
                <Routes>
                    <Route path="/home" element={<Store />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/search/:search" element={<SearchResults />} />

                    <Route path="/faq" element={<Faq />} />
                </Routes>
            </Router>
        </div>
    );
}

export default Electroware;
