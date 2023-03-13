import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { useState } from "react";

import { Store } from "./pages/Store";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { Product } from "./pages/Product";
import { Faq } from "./pages/Faq";
import { SearchResults } from "./pages/SearchResults";
import { NotFound } from "./pages/NotFound";
import { ShoppingCart } from "./pages/ShoppingCart";
import { UserProfile } from "./pages/UserProfile";
import { ProfileMenu } from "./components/ProfileMenu";
import { Checkout } from "./pages/Checkout";

function Electroware() {
    let initialState = {
        id: "",
        saldo: 0,
        username: "",
        token: "",
        logged: false,
    };
    let [user, setUser] = useState(initialState);
    // useEffect(() => {
    //     let storageInfo = localStorage.getItem("user")
    //     if(storageInfo){
    //         console.log(storageInfo)
    //         setUser(JSON.parse(storageInfo))
    //     }
    // }, [])
    let [infoMenuActive, toggleInfoMenu] = useState(false);
    function handleInfoMenu() {
        toggleInfoMenu(!infoMenuActive);
    }
    return (
        <div className="electroware">
            <Router>
                <Header
                    user={user}
                    setUser={setUser}
                    handleInfoMenu={handleInfoMenu}
                    isMenuActive={infoMenuActive}
                />
                <ProfileMenu
                    isActive={infoMenuActive}
                    toggleMenu={toggleInfoMenu}
                    user={user}
                />
                <Routes>
                    <Route
                        path="/home"
                        element={<Store user={user} setUser={setUser} />}
                    />
                    <Route
                        path="/login"
                        element={<Login user={user} setUser={setUser} />}
                    />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/faq" element={<Faq />} />

                    {/* need params */}
                    <Route path="/user" element={<UserProfile />} />
                    <Route
                        path="/product/:id"
                        element={<Product user={user} setUser={setUser} />}
                    />
                    <Route path="/search/:search" element={<SearchResults />} />

                    {/* protected */}
                    <Route path="/shopping-cart" element={<ShoppingCart />} />
                    <Route path="/checkout" element={<Checkout />} />

                    {/* misc */}
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

export default Electroware;
