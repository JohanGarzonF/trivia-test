import { Route, Routes } from 'react-router-dom'
import { Header } from './trivia/components'
import { HomePage, TriviaPage } from './trivia/pages'

function App() {

  return (
    <div className='bg-gradient-to-r from-teal-800 via-slate-700 to-gray-600 h-screen'>
      <Header />
      <Routes>
        <Route path='/' element={ <HomePage /> }/>
        <Route path='/trivia' element={ <TriviaPage /> } />
      </Routes>
    </div>
  )
}

export default App
