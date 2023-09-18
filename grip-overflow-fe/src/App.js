import Dashboard from "./component/dashboard";
import Error500 from "./component/error500";
import Notfound from "./component/notfound";
import Question from "./component/question";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter >
        <Routes >

          <Route path="/" element={<Dashboard />} />
          <Route path="/question" element= { <Question /> } />
          <Route path="/error500" element= {<Error500 />} />
          <Route path="/notfound" element= {<Notfound/>} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
