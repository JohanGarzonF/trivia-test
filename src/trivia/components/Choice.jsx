


export const Choice = ({ answer, i, answerIdSelected, onAnswerClick }) => {
  return (
    <li
      className={`${
        answerIdSelected.index === i ? 'bg-black text-white' : ''
      } w-full font-black p-1.5 border-1 border-solid rounded-2xl mb-1.5 hover:bg-black hover:text-white cursor-pointer`}
      onClick={() => onAnswerClick( answer, i )}>
      { answer }
    </li>
  )
}
