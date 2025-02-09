import { Topbar } from "../components/TopBar"
import Licitation from "../components/Licitation"

const licitations = [
  { name: "Licitation 1", description: "Description 1", status: "Status 1", date: "Date 1", userType: 1 },
  { name: "Licitation 2", description: "Description 2", status: "Status 2", date: "Date 2", userType: 2 },
  { name: "Licitation 3", description: "Description 3", status: "Status 3", date: "Date 3", userType: 1},
];

const MainUser = () => {
  return (
    <div>
      <Topbar />
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
  );
};

export default MainUser;