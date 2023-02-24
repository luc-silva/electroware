import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";

import "./Electroware.css";
import { Store } from "./pages/Store";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";

function Electroware() {
    return (
        <div className="electroware">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Store />} />
                    <Route path="/login" element={<Login />}/>
                    <Route path="/registration" element={<Registration />}/>
                </Routes>
            </Router>
        </div>
    );
}

export default Electroware;
