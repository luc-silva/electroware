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
import { CreateOffer } from "./pages/CreateOffer";
import { AddFunds } from "./pages/AddFunds";
import { Settings } from "./pages/Settings";
import { Category } from "./pages/Category";
import { Wishlist } from "./pages/Wishlist";
import { Footer } from "./components/Misc/Footer";

function Electroware() {
    let initialState = {
        id: "",
        funds: 0,
        username: "",
        token: "",
        logged: false,
        description: "",
    };
    let [user, setUser] = useState(initialState);
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
                    setUser={setUser}
                />
                <Routes>
                    <Route
                        path="/"
                        element={<Store user={user} setUser={setUser} />}
                    />
                    <Route
                        path="/login"
                        element={<Login user={user} setUser={setUser} />}
                    />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/faq" element={<Faq />} />

                    {/* need params */}
                    <Route path="/user/:id" element={<UserProfile />} />
                    <Route
                        path="/product/:id"
                        element={<Product user={user} />}
                    />
                    <Route path="/search/:search" element={<SearchResults />} />
                    <Route path="/category/:id" element={<Category />} />

                    {/* protected */}
                    <Route
                        path="/shopping-cart"
                        element={<ShoppingCart user={user} setUser={setUser} />}
                    />
                    <Route
                        path="/wishlist"
                        element={<Wishlist user={user} />}
                    />
                    <Route
                        path="/checkout"
                        element={<Checkout user={user} setUser={setUser} />}
                    />
                    <Route
                        path="/create-offer"
                        element={<CreateOffer user={user} setUser={setUser} />}
                    />
                    <Route
                        path="/add-funds"
                        element={<AddFunds user={user} setUser={setUser} />}
                    />
                    <Route
                        path="/settings"
                        element={<Settings user={user} setUser={setUser} />}
                    />

                    {/* misc */}
                    <Route path="/*" element={<NotFound />} />
                    <Route path="/not-found" element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default Electroware;
