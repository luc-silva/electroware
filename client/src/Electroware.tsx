import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { createContext, useContext, useEffect, useState } from "react";

import { Store } from "./pages/Store";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { Product } from "./pages/Product";
import { Faq } from "./pages/Faq";
import { SearchResults } from "./pages/SearchResults";
import { NotFound } from "./pages/NotFound";
import { ShoppingCart } from "./pages/ShoppingCart";
import { UserProfile } from "./pages/UserProfile";

function Electroware() {
    let initialState = {
        id: "",
        saldo: 0,
        username:"",
        token:""

    }
    let [user, setUser] = useState(initialState)
    // useEffect(() => {
    //     let storageInfo = localStorage.getItem("user")
    //     if(storageInfo){
    //         console.log(storageInfo)
    //         setUser(JSON.parse(storageInfo))
    //     }
    // }, [])
    let [infoModalActive, toggleInfoModal] = useState(false)
    function handleInfoModal(){
        toggleInfoModal(!infoModalActive)
    }

    return (
        <div className="electroware">
            <Router>
                <Header user={user} setUser={setUser} handleInfoModal={handleInfoModal}/>
                <Routes>
                    <Route path="/home" element={<Store user={user} setUser={setUser} />} />
                    <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/faq" element={<Faq />} />

                    {/* need params */}
                    <Route path="/user" element={<UserProfile />} />
                    <Route path="/product/:id" element={<Product user={user} setUser={setUser}/>} />
                    <Route path="/search/:search" element={<SearchResults />} />

                    {/* protected */}
                    <Route path="/shopping-cart" element={<ShoppingCart />} />

                    {/* misc */}
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

export default Electroware;
