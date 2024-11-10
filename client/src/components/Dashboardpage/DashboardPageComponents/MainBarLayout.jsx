import Favourite from "./MainBarComponents/Favourite"
import FeedBack from "./MainBarComponents/FeedBack"
import TranslatorBox from "./MainBarComponents/TranslatorBox"

const MainBarLayout = () => {
  return (
    <>
      <main className="lg:w-[85%] h-full p-[10px] overflow-y-scroll w-full">
        <Favourite />
        <TranslatorBox />
        <FeedBack />
      </main>
    </>
  )
}

export default MainBarLayout