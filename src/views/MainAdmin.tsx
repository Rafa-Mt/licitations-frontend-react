import Logout from '../components/Logout'
import Licitation from '../components/Licitation'

const MainAdmin = () => {
    return (
        <>        
        <div>MainAdmin</div>
        <Logout/>
        <Licitation name="Licitation 1" description="Description 1" status="Status 1" date="Date 1" userType='admin'/>
        </>

    )
}

export default MainAdmin