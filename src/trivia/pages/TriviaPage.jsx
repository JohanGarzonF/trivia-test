import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { CircleLoader } from 'react-spinners'
import { Choice } from '../components'

const getTrivia = async () => {
  const resp = await fetch('https://opentdb.com/api.php?amount=1').then(resp =>
    resp.json()
  )
  return resp
}

export const TriviaPage = () => {
  const [choices, setChoices] = useState([])
  const [answerIdSelected, setAnswerIdSelected] = useState({
    answer: '',
    index: undefined
  })
  const [isCorrect, setIsCorrect] = useState(true)
  const [isReveal, setIsReveal] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState()
  const [burnedQuestions, setBurnedQuestions] = useState(0)

  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ['triviaQuestion'],
    queryFn: getTrivia
  })

  const onAnswerClick = (answer, index) => {
    setAnswerIdSelected({ answer, index })
  }

  useEffect(() => {
    setAnswerIdSelected({ answer: '', index: undefined })
    setIsReveal(false)
    if (!isFetching && data) {
      const correctAnswer = data.results[0].correct_answer
      setCorrectAnswer(correctAnswer)
      const newChoices = [...data.results[0].incorrect_answers]
      const max = 4
      const rp = Math.floor(Math.random() * (max + 1))
      newChoices.splice(rp, 0, correctAnswer)
      setChoices(newChoices)
    }
  }, [data])

  const onParseText = ( text ) => {
    const decodingText = decodeURIComponent(text)
    console.log(text, decodingText)
    return decodingText
  }

  const handleRevealAnswer = () => {
    setIsReveal(true)
    setBurnedQuestions(burnedQuestions + 1)
    if (correctAnswer === answerIdSelected.answer) {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
    }
  }

  if (error) {
    return <h1>Error!</h1>
  } else {
    return (
      <div className='h-[90%] w-90 flex flex-col justify-center items-center m-auto'>
        <span className='font-bold text-white'>
          Burned Questions: {burnedQuestions}
        </span>
        <div
          className={`flex flex-col items-center justify-between min-h-80 w-96 bg-white rounded-2xl p-2 ${
            isFetching && 'flex justify-center items-center'
          }`}>
          {isFetching && !error ? (
            <CircleLoader
              className='self-center justify-self-center'
              color='#000'
            />
          ) : (
            <>
              <h3 className='font-extrabold text-2xl'>Trivia!</h3>
              <p className='text-center font-bold my-2'>
                { onParseText(data?.results[0].question) }
              </p>
              {isReveal && (
                <div className='flex flex-col items-center text-center mb-2'>
                  <span
                    className={`${
                      isCorrect ? 'bg-green-700' : 'bg-red-800'
                    } rounded-2xl text-white font-bold p-2 flex justify-center max-w-40`}>
                    {isCorrect ? 'correct!' : 'incorrect!'}
                  </span>
                  {!isCorrect && <p>The correct answer is: {correctAnswer}</p>}
                </div>
              )}
              <ul className='w-full text-center'>
                {choices?.map((answer, i) => (
                  <Choice
                    key={answer}
                    answer={answer}
                    i={i}
                    answerIdSelected={answerIdSelected}
                    onAnswerClick={onAnswerClick}
                  />
                ))}
              </ul>
              <div className="flex w-full px-2">
                <ul className='flex justify-between w-full'>
                  <li className='flex flex-col text-xs'>
                    <span className='font-bold'>Difficulty: </span> { data.results[0].difficulty }
                  </li>
                  <li className='flex flex-col text-xs'>
                    <span className='font-bold'>Category: </span> { data.results[0].category }
                  </li>
                </ul>
              </div>
              <div className='justify-self-end w-full flex justify-center gap-2 my-2'>
                <button
                  onClick={() => handleRevealAnswer()}
                  className='flex justify-center items-center rounded-md bg-black font-extrabold text-white p-1 hover:opacity-85 cursor-pointer uppercase'>
                  reveal answer
                </button>
                <button
                  onClick={() => refetch()}
                  className='flex justify-center items-center rounded-md bg-black font-extrabold text-white p-1 hover:opacity-85 cursor-pointer uppercase disabled:opacity-25'
                  disabled={!isReveal}>
                  next question
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}
