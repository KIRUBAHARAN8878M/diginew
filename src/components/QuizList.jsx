
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function QuizList() {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('quizData');
    if (storedData) {
      const quizzes = JSON.parse(storedData);
       setQuizData([quizzes]);
    
    }
    
  }, []);

  function handleEditQuiz(index) {
    const quizToEdit = quizData[index];
    localStorage.setItem("quizToEdit", JSON.stringify(quizToEdit));
    
    navigate("/edit-quiz");
  }

  function handleRemoveQuiz(index) {
    const updatedQuizData = [...quizData];
    updatedQuizData.splice(index, 1);
    localStorage.setItem("quizData", JSON.stringify(updatedQuizData));
    setQuizData(updatedQuizData);
    navigate("/");
  }

  return (
    <div className="mt-5 pt-5   container ">
      <table class="table">
        <thead>
            <tr>
                <th>S.no</th>
                <th>Quiz name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {quizData.map((quiz, index) => (

<tr key={index}>
    
    <td>{index+1}</td>
  <td>{quiz.quizName}</td>
<td className="mx-2">  <button type="button" className="btn btn-primary mx-2 " onClick={() => handleEditQuiz(index)}>
    Edit Quiz
  </button>
  <button type="button" className="btn btn-danger mx-2 " onClick={() => handleRemoveQuiz(index)}>
    Remove Quiz
  </button></td>
</tr>
))}
        </tbody>
      </table>
     
    </div>
  );
}

export default QuizList;