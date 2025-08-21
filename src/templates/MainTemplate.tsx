import { Outlet } from "react-router-dom"
import { Header } from "@components/common"
import { Footer } from "@components/common"

const MainTemplate = () => {
  return (
    <>
      <Header />
      <div className="wrapper container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default MainTemplate