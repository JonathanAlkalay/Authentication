import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Login } from "../pages/login/LoginPage"



export const Shell = () => {
    return (
        <Router>
            <Login/>
        </Router>
    )
}