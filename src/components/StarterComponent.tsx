import { useDispatch } from "react-redux"
import EditorIcon from "../assets/Svg/EditorIcon"
import { startQuiz } from "../store/slice/quizSlice"
import NavComponent from "./NavComponent"
import { Question } from "../types"
interface Prop {
  setIsQuizStart: React.Dispatch<React.SetStateAction<boolean>>
  que: Question[]
}

const StarterComponent: React.FC<Prop> = ({ setIsQuizStart, que }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col h-[100vh]">
      <NavComponent />
      <div className="flex flex-col gap-8 flex-grow h-full items-center justify-center">
        <EditorIcon />
        <div className="flex items-center flex-col gap-3 ">

          <h1 className="text-3xl font-bold text-black">
            Sentence Construction
          </h1>
          <p className="text-[#7C8181] lg:w-[65%] text-center">
            Select the correct words to complete the sentence by arranging the provided options in the right order.
          </p>
        </div>
        <div className="flex gap-3 items-center justify-center divide-x-black">
          {[{ text: 'Time Per Question', subTetx: '30s' }, { text: 'Total Questions', subTetx: '10' }, { text: 'Coins', subTetx: '0' }].map((item, id) => (
            <div key={id} className="flex gap-6 items-center ">
              <div className="flex flex-col gap-3">
                <h3 className="text-xl text-[#2A2D2D] font-medium">
                  {item.text}
                </h3>
                <p className={`text-[#7C8181] text-center ${id === 2 ? 'flex gap-1 justify-center items-center' : ''}`}>
                  {id === 2 && <span className="p-1 rounded-full w-1   bg-[#FFD700] border-3 border-[#F5CE00]">
                  </span>}
                  {item.subTetx}</p>
              </div>
              {id !== 2 && <div className="w-[1px] h-12  bg-[#DFE3E3]"></div>}
            </div>
          ))}
        </div>
        <div className="flex gap-3 items-center">
          <button className="border-[#453FE1] text-[#453FE1] border-1 rounded-md px-4 py-1">
            Back
          </button>
          <button onClick={() =>{dispatch(startQuiz(que)); setIsQuizStart((prev) => !prev)}} className="bg-[#453FE1] rounded-md px-4 py-1">
            Start
          </button>
        </div>
      </div>
    </div>
  )
}

export default StarterComponent