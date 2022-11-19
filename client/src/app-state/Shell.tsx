import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "../log-in/Login"



export const Shell = () => {
    return (
        <Router>
            <Login/>
        </Router>
    )
}