import { Outlet } from "react-router-dom"
import { Header } from "@components/common"
import { Footer } from "@components/common"

const MainTemplate = () => {
  return (
    <div className="bg-[#1A0623] min-h-screen text-white">
      <Header />
      <div className="wrapper container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainTemplate