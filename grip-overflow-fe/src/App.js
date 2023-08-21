import Dashboard from "./component/dashboard";
import Question from "./component/question";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter >
        <Routes >

          <Route path="/" element={<Dashboard />} />
          <Route path="/question" element= { <Question /> } />

        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
