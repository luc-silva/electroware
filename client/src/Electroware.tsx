import { userSessionInitialState } from "./constants/initialStates";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { useState } from "react";

//pages
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
import { HMenu } from "./components/Misc/HMenu";

// subpages
import { EditProfile } from "./components/Sections/EditProfile";
import { DeleteAccount } from "./components/Sections/DeleteAccount";
import { SettingsTransaction } from "./components/Sections/SettingsTransaction";
import { SettingsUserProducts } from "./components/Sections/SettingsUserProducts";
import { EditProduct } from "./components/Sections/EditProduct";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";

function Electroware() {
    let [user, setUser] = useState(userSessionInitialState);
    let [infoMenuActive, toggleInfoMenu] = useState(false);
    function handleInfoMenu() {
        toggleInfoMenu(!infoMenuActive);
    }

    let [isHMenuActive, toggleHMenu] = useState(false);
    function toggleHamburguerMenu() {
        toggleHMenu(!isHMenuActive);
    }
    return (
        <div className="electroware">
            <Router>
                <Header
                    user={user}
                    setUser={setUser}
                    handleInfoMenu={handleInfoMenu}
                    isMenuActive={infoMenuActive}
                    toggleHMenu={toggleHamburguerMenu}
                />
                {/* modals/dialogs */}
                <ProfileMenu
                    isActive={infoMenuActive}
                    toggleMenu={toggleInfoMenu}
                    user={user}
                    setUser={setUser}
                />
                <HMenu
                    setUser={setUser}
                    user={user}
                    toggleHMenu={toggleHMenu}
                    isMenuActive={isHMenuActive}
                />

                {/* pages */}
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
                    <Route path="/privacy" element={<PrivacyPolicy />} />
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
                    >
                        <Route path="" element={<EditProfile user={user} />} />
                        <Route
                            path="products/"
                            element={<SettingsUserProducts user={user} />}
                        />

                        <Route
                            path="products/:id"
                            element={<EditProduct user={user} />}
                        />
                        <Route
                            path="delete-account"
                            element={<DeleteAccount user={user} />}
                        />
                        <Route
                            path="transactions"
                            element={<SettingsTransaction user={user} />}
                        />
                    </Route>

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
