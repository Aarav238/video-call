import {Routes , Route} from "react-router-dom"
import Lobby from "./screens/Lobby"
import Room from "./screens/Room"


function App() {
  

  return (
    <div>
    <Routes>
      <Route  path="/" element={<Lobby />}/>
      <Route path='/room/:id' element={<Room/>}/>
      
    </Routes>
    </div>
  )
}

export default App
