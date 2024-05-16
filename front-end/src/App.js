import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Layout from './admin/layout/Layout';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './pages/Home';
import Activities from './admin/Activties';
import AddActivity from './admin/AddActivity';
import EditActivity from './admin/EditActivity';
import UserActivities from './admin/UserActivities';
import AddUserActivity from './admin/AddUserActivity';
import EditUserActivity from './admin/EditUserActivity';
import Conseils from './pages/Conseils';
import Dashboard from './admin/Dashboard';
import Bonus from './admin/Bonus';
import ConsomationParMois from './admin/ConsomationParMois';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/conseils' element={<Conseils />} />
                <Route path='/admin/dashboard' element={<Dashboard />} />
                <Route path='/admin/bonus' element={<Bonus />} />

                <Route path='/admin/activities' element={<Activities />} />
                <Route path='/admin/add-activity' element={<AddActivity />} />
                <Route path='/admin/edit-activity/:id' element={<EditActivity />} />

                <Route path='/admin/ConsomationParMois' element={<ConsomationParMois />} />

                <Route path='/admin/userActivities' element={<UserActivities />} />
                <Route path='/admin/add-userActivity' element={<AddUserActivity />} />
                <Route path='/admin/edit-userActivity/:id' element={<EditUserActivity />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
