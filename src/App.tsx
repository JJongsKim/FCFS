import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import Introduction from './pages/Introduction';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/introduction" element={<Introduction />} />
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
