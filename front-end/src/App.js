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

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/conseils' element={<Conseils />} />
                <Route path='/dashboard' element={<Layout />} />

                <Route path='/admin/activities' element={<Activities />} />
                <Route path='/admin/add-activity' element={<AddActivity />} />
                <Route path='/admin/edit-activity/:id' element={<EditActivity />} />


                <Route path='/admin/userActivities' element={<UserActivities />} />
                <Route path='/admin/add-userActivity' element={<AddUserActivity />} />
                <Route path='/admin/edit-userActivity/:id' element={<EditUserActivity />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
