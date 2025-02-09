import React from 'react'
import Licitation from '../components/Licitation/Licitation'
import Logout from '../components/Logout/Logout'

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