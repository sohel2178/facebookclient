import React from "react";
import Home from "./Home";
import AddForm from './AddForm'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
const Main=()=>{
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/form" element={<AddForm/>}/>
                </Routes>
            </BrowserRouter>
            {/* <TestTable/> */}
            {/* <Table/> */}
            {/* <ReactVirtualizedTable/> */}
            {/* <Conformation/> */}
        </div>
    )
}
export default Main;