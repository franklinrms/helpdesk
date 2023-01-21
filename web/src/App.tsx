import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import Inbox from './pages/Inbox';

export default function App(): JSX.Element {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<h1>home</h1>} />
                <Route path="/inbox/" element={<Inbox />} />
                <Route path="/inbox/r/:id" element={<Inbox />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </UserContextProvider>
    );
}
