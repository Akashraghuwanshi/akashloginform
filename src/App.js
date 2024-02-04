import './App.css';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element ={<LoginForm/>}/>
          <Route path='/register' element ={<SignUpForm/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
