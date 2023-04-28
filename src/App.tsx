import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
