import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/layout';
import AuthLayout from './components/layout/AuthLayout';
import Introduction from './pages/Introduction';
import MainPage from './pages/MainPage';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/introduction" element={<Introduction />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
