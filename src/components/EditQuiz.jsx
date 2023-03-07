import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditQuiz() {
  const navigate = useNavigate();

  let data = localStorage.getItem('quizData')

 
  const [quizName, setQuizName] = useState(JSON.parse(data).quizName);
  const [questions, setQuestions] = useState(JSON.parse(data).questions);

  function handleQuizNameChange(event) {
    setQuizName(event.target.value);
  }

  function handleQuestionChange(index, event) {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  }

  function handleOptionChange(questionIndex, optionIndex, event) {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(updatedQuestions);
  }

  function handleAddQuestion() {
    const updatedQuestions = [...questions];
    updatedQuestions.push({ question: '', options: ['', ''] });
    setQuestions(updatedQuestions);
  }

  function handleRemoveQuestion(index) {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  }

  function handleAddOption(questionIndex) {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  }

  function handleRemoveOption(questionIndex, optionIndex) {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const updatedQuiz = { quizName, questions };
    localStorage.setItem('quizData', JSON.stringify(updatedQuiz));
   
    alert('data edited')
    navigate('/display')
    
  }

  return (
    <div className='container pt-5'>
      <div className='row'>
        <div className='col-lg-8 col-md-8 col-sm-8'>
        <form onSubmit={handleSubmit}>
     <div className='d-flex input-group'>
     <label className='fw-bold'>
        Quiz Name:
        
      </label>
      <input type="text" className='form-control' value={quizName} onChange={handleQuizNameChange} />
     </div>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <div className='d-flex input-group pt-3 pb-3'>
          <label className='fw-bold'>
            Question:
            
          </label>
          <input type="text" className='form-control' value={question.question} onChange={(event) => handleQuestionChange(questionIndex, event)} />
          </div>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className='d-flex input-group pt-3 pb-3'>
              <label>
                Option {optionIndex + 1}:
                
              </label>
              <input type="text" className='form-control' value={option} onChange={(event) => handleOptionChange(questionIndex, optionIndex, event)} />
              <button type="button" className='btn btn-danger mx-2' onClick={() => handleRemoveOption(questionIndex, optionIndex)}>
                Remove Option
              </button>
            </div>
          ))}
         <div className='d-flex pt-2 pb-2'>
         <button type="button" className='btn btn-primary mx-2' onClick={() => handleAddOption(questionIndex)}>
            Add Option
          </button>
          <button type="button" className='btn btn-danger mx-2' onClick={() => handleRemoveQuestion(questionIndex)}>
            Remove Question
          </button>
         </div>
        </div>
      ))}
      <div className='d-flex pt-2 pb-2'>
      <button type="button" className='btn btn-primary mx-2' onClick={handleAddQuestion}>
        Add Question
      </button>
      <button type="submit" className='btn btn-success mx-2'>Save Quiz</button>
      </div>
    </form>
        </div>
      </div>
    </div>
  );
}
 export default EditQuiz;