import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
import Todos from './Todos';
import Home from './components/Home';
import SurveyForm from './components/SurveyForm';
import Stopwatch from './components/Stopwatch';
import TodoApp from './components/TodoApp';

function App() {

  return (
    <>
      <nav>
        <Link to="/">ホーム</Link> | <Link to="/todos">TODOリスト</Link> | <Link to="/survey">アンケートフォーム</Link> | <Link to="/stopwatch">ストップウォッチ</Link> | <Link to="/newtodo">New Todo</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todos' element={<Todos />} />
        <Route path='/survey' element={<SurveyForm />} />
        <Route path='/stopwatch' element={<Stopwatch />} />
        <Route path='/newtodo' element={<TodoApp />} />
      </Routes>

    </>
  )
}

export default App
