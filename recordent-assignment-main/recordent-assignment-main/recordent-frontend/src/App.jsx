import { BrowserRouter,Routes,Route }

from "react-router-dom";


import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import Upload from "./pages/Upload";

import ViewBuyers from "./pages/ViewBuyers";


function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>

<Route path="/register" element={<Register/>}/>

<Route path="/dashboard" element={<Dashboard/>}/>

<Route path="/upload" element={<Upload/>}/>

<Route path="/view" element={<ViewBuyers/>}/>

</Routes>

</BrowserRouter>

);

}

export default App;
