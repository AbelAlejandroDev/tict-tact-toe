export const Square = ({onSquareClick,value}) => {
  return (
    <button 
    className="w-16 h-16  bg-white border border-gray-300 text-3xl font-bold flex justify-center items-center"
      onClick={onSquareClick}>
      {value}
    </button>
  )
}