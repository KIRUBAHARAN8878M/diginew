import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateQuiz from './components/CreateQuiz';
import QuizList from './components/QuizList';
import EditQuiz from './components/EditQuiz';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<CreateQuiz />} />
      <Route path='/display' element={<QuizList   />} />
      <Route path='/edit-quiz' element={<EditQuiz  />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
