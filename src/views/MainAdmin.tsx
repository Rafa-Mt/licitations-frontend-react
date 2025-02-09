
import Licitation from '../components/Licitation'
import { Topbar } from '../components/TopBar'
const MainAdmin = () => {
    return (
        <>        
        <Topbar/>
        <div>MainAdmin</div>
        
        <Licitation name="Licitation 1" description="Description 1" status="Status 1" date="Date 1" userType= {1}/>
        </>

    )
}

export default MainAdmin