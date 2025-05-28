import './App.css'
import { Article } from './components/article/article'
import { AutoDealerShip } from './components/autoDealerShip/autoDealerShip'
import { Career } from './components/careerSection/career/career'
import { CareerOpenings } from './components/careerSection/careerOpening/careerOpening'
import { CareerOpeningCategory } from './components/careerSection/careerOpeningCategory/careerOpeningCategory'
import { CityStateCountry } from './components/cityStateCountry/cityStateCountry'
import { Faq } from './components/faq/faq'
import { Main } from './pages/main'
import { Routes, Route, Navigate} from "react-router-dom"

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Main/>}>
        <Route index element={<Navigate to="/admin/article" replace />} />
        <Route path="admin/article" element={<Article/>}/>
        <Route path="admin/auto_dealerShip" element={<AutoDealerShip/>}/>
        <Route path="admin/faq" element={<Faq/>}/>
        <Route path="admin/Career" element={<Career/>}/>
        <Route path="admin/CareerOpenings" element={<CareerOpenings/>}/>
        <Route path="admin/CareerOpeningsCategory" element={<CareerOpeningCategory/>}/>
        <Route path="admin/CityStateCountry" element={<CityStateCountry/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
