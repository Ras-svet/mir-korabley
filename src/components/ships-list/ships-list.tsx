import React from 'react';
import { Vehicle } from 'types';

interface ShipsListProps {
  vehicles: Vehicle[];
}

const ShipsList: React.FC<ShipsListProps> = (props) => {
  const { vehicles } = props;
  const [vehiclesToShow, setVehiclesToShow] = React.useState<Vehicle[]>([]);
  const [page, setPage] = React.useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(vehicles.length / itemsPerPage);

  React.useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setVehiclesToShow(vehicles.slice(startIndex, endIndex));
  }, [page, vehicles]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="ships-list">
      <ul className="ships-list_list">
        {vehiclesToShow.map((vehicle, index) => (
          <li key={index}>
            {vehicle.title}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default ShipsList;
