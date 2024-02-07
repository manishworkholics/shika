import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import PageNotFound from './components/pages/PageNotFound';
import App from './App';
import './App.css';
import Product from './components/pages/Product';
import Cutomer from './components/pages/Cutomer';
import Reports from './components/pages/Reports';
import DailyEntry from './components/pages/DailyEntry';
import EditCustomer from './components/pages/EditCustomer';
import AddCustomer from './components/pages/AddCustomer';


const root = ReactDOM.createRoot(
    document.getElementById("root")
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/shika" element={<App />}>
                <Route index path="/shika" element={<Home />} />
                <Route index path="/shika/product" element={<Product />} />
                <Route index path="/shika/customer" element={<Cutomer />} />
                <Route index path="/shika/edit-customer/:id" element={<EditCustomer />} />
                <Route index path="/shika/add-customer" element={<AddCustomer />} />
                <Route index path="/shika/report" element={<Reports />} />
                <Route index path="/shika/daily-entry" element={<DailyEntry />} />
                <Route path='*' element={<PageNotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

