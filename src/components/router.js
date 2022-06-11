import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home.js';
import Shopping from './pages/shopping.js';
import Checkout from './pages/checkout.js';
import Sorry from './pages/sorry.js';

function Router() {
    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/shop" element={<Shopping/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="*" element={<Sorry/>}/>
        </Routes>
        </BrowserRouter>
    );
}

export default Router;