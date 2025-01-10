import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Layout_arava from './Components/Layout/Layout_arava.jsx'
import {LAYOUT, LOGIN} from "./utils/consts.jsx";
import Login from "./Pages/Login/Login.jsx";


function App() {
    const user_type = "moderator"
    return (
        <>
            <Routes>

                <Route path={LAYOUT} element={<Layout_arava/>}/>
                <Route path={LOGIN} element={<Login/>}/>
            </Routes>
        </>
    )
}

export default App