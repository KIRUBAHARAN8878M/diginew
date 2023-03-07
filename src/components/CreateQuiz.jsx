import React, { useState, useEffect } from 'react';
import {  useNavigate} from 'react-router-dom';

const CreateQuiz = () => {
const [quizName, setQuizName] = useState('');
const [questions, setQuestions] = useState([]);
const Navigate = useNavigate();

const handleQuizNameChange = (event) => {
setQuizName(event.target.value);
};

const handleAddQuestion = () => {
setQuestions([...questions, { question: '', options: ['', ''] }]);
};

const handleQuestionChange = (event, index) => {
const updatedQuestions = [...questions];
updatedQuestions[index].question = event.target.value;
setQuestions(updatedQuestions);
};

const handleAddOption = (index) => {
const updatedQuestions = [...questions];
updatedQuestions[index].options.push('');
setQuestions(updatedQuestions);
};

const handleRemoveOption = (index, optionIndex) => {
const updatedQuestions = [...questions];
updatedQuestions[index].options.splice(optionIndex, 1);
setQuestions(updatedQuestions);
};

const handleOptionChange = (event, index, optionIndex) => {
const updatedQuestions = [...questions];
updatedQuestions[index].options[optionIndex] = event.target.value;
updatedQuestions[index].answer = event.target.value;
setQuestions(updatedQuestions);
};

const handleRemoveQuestion = (index) => {
const updatedQuestions = [...questions];
updatedQuestions.splice(index, 1);
setQuestions(updatedQuestions);
};

const handleSubmit = (event) => {
event.preventDefault();
const data = { quizName, questions };


localStorage.setItem('quizData', JSON.stringify(data));
Navigate("/display");
// console.log(data);
};

// useEffect(() => {
// const storedData = localStorage.getItem('quizData');
// if (storedData) {
// const { quizName, questions } = JSON.parse(storedData);
// setQuizName(quizName);
// setQuestions(questions);
// }
// }, []);

return (
<div className='container'><div className='row'><div className='col-lg-10 col-md-10 col-sm-8'>
<form onSubmit={handleSubmit}>
<div className=' d-flex pt-5 pb-2 input-group'>
<label className='fw-bold'>
Quiz Name: 
</label>
<input type="text" class="form-control" value={quizName} onChange={handleQuizNameChange} />
<button type="button"className='btn btn-primary mx-3' onClick={handleAddQuestion}>
Add Question
</button>
</div>
{questions.map((question, index) => (
<div key={index} >
<div className='d-flex pb-3 input-group'>
<label>
Question:
</label>
<input
class="form-control"
type="text"
value={question.question}
onChange={(event) => handleQuestionChange(event, index)}
/>
<button type="button" className='btn btn-primary mx-2' onClick={() => handleAddOption(index)}>
Add Option
</button>
<button type="button" className='btn btn-danger mx-2' onClick={() => handleRemoveQuestion(index)}>
Remove Question
</button>
</div>
{question.options.map((option, optionIndex) => (
<div key={optionIndex} className='d-flex  input-group pb-3'>
<input
  type="radio"
 
  value={option}
  name={`question-${index}`}
  checked={option === question.answer}
  onChange={(event) => handleOptionChange(event, index, optionIndex)}
/>
<label className='fw-bold'>


Option:

</label>
<input
type="text"
class="form-control "
value={option}
onChange={(event) => handleOptionChange(event, index, optionIndex)}
/>
<button
type="button"
className='btn btn-danger mx-2 mr-2'
onClick={() => handleRemoveOption(index, optionIndex)}
>
Remove Option
</button>
</div>
))}

</div>
))}
<div className='pt-5'>
<button type="submit" className='btn btn-success mx-2 '>
Submit
</button>
</div>
{/* <Link to='/display'>Display Quiz Data</Link> */}
</form>
  </div></div></div>
);
};

export default CreateQuiz;