import { useNavigate } from 'react-router-dom'



export const HomePage = () => {

  const navigate = useNavigate()

  const handleClick = () => {
    console.log('click')
    navigate('/trivia')
  }

  return (
    <div className='flex flex-col items-center h-[80%]'>
      <h2 className='font-bold text-white text-4xl mt-10'>¡Hi, Welcome to Trivia Play!</h2>
      <div className="h-full w-full flex justify-center items-center">
        <button
          className='flex justify-center items-center rounded-md bg-black font-extrabold text-white p-2 hover:opacity-85 cursor-pointer uppercase'
          onClick={ handleClick }>
          start game
        </button>
      </div>
    </div>
  )
}