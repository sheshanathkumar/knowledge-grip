import Dashboard from "./component/dashboard";
import Error500 from "./component/error500";
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
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
