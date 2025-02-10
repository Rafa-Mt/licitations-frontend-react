import { useEffect, useState } from "react";
import { Topbar } from "../components/TopBar";
import Licitation from "../components/Licitation";

// Función para generar una fecha aleatoria
const getRandomDate = () => {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
};

const initialLicitations = [
  { name: "Licitation 1", description: "Description 1", status: "Status 1", date: getRandomDate(), userType: 1 },
  { name: "Licitation 2", description: "Description 2", status: "Status 2", date: getRandomDate(), userType: 2 },
  { name: "Licitation 3", description: "Description 3", status: "Status 3", date: getRandomDate(), userType: 1 },
  { name: "Licitation 4", description: "Description 4", status: "Status 4", date: getRandomDate(), userType: 2 },
  { name: "Licitation 5", description: "Description 5", status: "Status 5", date: getRandomDate(), userType: 1 },
  { name: "Licitation 6", description: "Description 6", status: "Status 6", date: getRandomDate(), userType: 2 },
  { name: "Licitation 7", description: "Description 7", status: "Status 7", date: getRandomDate(), userType: 1 },
  { name: "Licitation 8", description: "Description 8", status: "Status 8", date: getRandomDate(), userType: 2 },
  { name: "Licitation 9", description: "Description 9", status: "Status 9", date: getRandomDate(), userType: 1 },
  { name: "Licitation 10", description: "Description 10", status: "Status 10", date: getRandomDate(), userType: 2 },
];

const MainUser = () => {
  const [licitations, setLicitations] = useState(initialLicitations);

  useEffect(() => {
    // Simula una llamada a una API para obtener las licitaciones
    const fetchLicitations = async () => {
      // Aquí puedes hacer una llamada a una API real si es necesario
      const fetchedLicitations = initialLicitations; // Simula datos obtenidos de una API
      setLicitations(fetchedLicitations);
    };

    fetchLicitations();
  }, []);

  return (
    <div>
      <Topbar />
      <div style={{ marginTop: '100px' }}> {/* Ajusta el valor según sea necesario */}
        {licitations.map((licitation, index) => (
          <Licitation
            key={index}
            name={licitation.name}
            description={licitation.description}
            status={licitation.status}
            date={licitation.date}
            userType={licitation.userType}
          />
        ))}
      </div>
    </div>
  );
};

export default MainUser;