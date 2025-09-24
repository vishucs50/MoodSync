  import { Routes, Route,  Navigate } from "react-router";
  import MoodSelector from "./components/MoodSelector";
  import ExpressMood from "./components/ExpressMood";
  import Home from "./Home";
  import { useLocation } from "react-router";
  import Suggestion from "./components/Suggestion";
  import Navbar from "./components/Navbar";
  function App() {
    const location=useLocation();
    const path=location.pathname;
    console.log(path);
    return (
      <>
      {(path!='/mood' && path!='/express') ? <Navbar/> : null}  
        <Routes>
          

          <Route path="/" element={<Home />}>
           
            <Route index element={<Navigate to="express" />} />
            <Route path="mood" element={<MoodSelector />} />
            <Route path="express" element={<ExpressMood />} />
          </Route>
            <Route path="suggest" element={<Suggestion />} />
        
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  }

  export default App;
