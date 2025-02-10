import { useEffect, useState } from 'react'
import Licitation from '../components/Licitation'
import { Topbar } from '../components/TopBar'
import { getApplicationsAdmin } from '../services/fetch'


const MainAdmin = () => {
    interface LicitationType {
        id: number;
        name: string;
        description: string;
        status: string;
        date: string;
        userType: number;
    }

    const [licitations, setLicitations] = useState<LicitationType[]>([]);
    useEffect(() => {
        getApplicationsAdmin().then((data) => {
            console.log('data recibida',data);
            setLicitations(data);
        });
    }, []);

    return (
        <>        
        <Topbar/>
        <div>MainAdmin</div>
        <div style={{ marginTop: '100px' }}> {/* Ajusta el valor según sea necesario */}
        {licitations.map((licitation, index) => (
          <Licitation
            key={index}
            id={licitation.id}
            name={licitation.name}
            description={licitation.description}
            status={licitation.status}
            date={new Date(licitation.date).toLocaleDateString()}
            userType={1}
          />
        ))}
      </div>
        </>

    )
}

export default MainAdmin