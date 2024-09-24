import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Allusers from "./pages/Allusers";
import Adduserform from "./pages/Adduserform";






function  App() {
  return (
    <>
    <div className="App">

      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/about" element={<About/>} />

        <Route path="/users" element={<Allusers/>} />
        <Route path="/addnewuser" element={<Adduserform/>} />
      </Routes>


    </div>

  </>
  );
}

export default App;
