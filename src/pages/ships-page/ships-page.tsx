import React from 'react';
import { useVehicles } from '../../hooks/use-vehicles';
import { ERRORS } from '../../constants/errors';
import ShipsList from '../../components/ships-list/ships-list';
import { Vehicle } from 'types';
import Filters from '../../components/filters/filters';

const ShipsPage = () => {
  const {
    vehicles,
    isLoading,
    error
  } = useVehicles();

  const [ filteredVehicles, setFilteredVehicles ] = React.useState<Vehicle[]>(vehicles);

  if (error) {
    return (ERRORS.WENT_WRONG)
  }
  if (isLoading) {
    return 'Loading ...'
  }

  const handleFilterVehicles = (filteredVehicles: Vehicle[] | []) => {
    setFilteredVehicles(filteredVehicles);
  };

  return (
    <div className="ships-page">
      <Filters
        vehicles={vehicles}
        onFilteredVehiclesChange={handleFilterVehicles}
      />
      <ShipsList vehicles={filteredVehicles as Vehicle[]} />
    </div>
  )
}

export default ShipsPage;
