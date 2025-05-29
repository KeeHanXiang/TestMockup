import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CBAnnualEstimateForm from "./CBAnnualEstimateForm";
import SubmittedDetailsPage from "./SubmittedDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CBAnnualEstimateForm />} />
        <Route path="/submitted" element={<SubmittedDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
