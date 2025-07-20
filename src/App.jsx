import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
import Todos from './Todos';
import Home from './components/Home';
import SurveyForm from './components/SurveyForm';

function App() {

  return (
    <>
      <nav>
        <Link to="/">ホーム</Link> | <Link to="/todos">TODOリスト</Link> | <Link to="/survey">アンケートフォーム</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todos' element={<Todos />} />
        <Route path='/survey' element={<SurveyForm />} />
      </Routes>

    </>
  )
}

export default App
