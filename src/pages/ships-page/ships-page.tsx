import React from 'react';
import { useVehicles } from '../../hooks/use-vehicles';
import { ERRORS } from '../../constants/errors';
import ShipsList from '../../components/ships-list/ships-list';
import {
  ListType,
  Vehicle,
} from 'types';
import Filters from '../../components/filters/filters';

const ShipsPage = () => {
  const { vehicles, isLoading, error } = useVehicles();

  const [filteredVehicles, setFilteredVehicles] = React.useState<Vehicle[]>(vehicles);
  const [listType, setListType] = React.useState<ListType>('GRID');

  if (error) {
    return ERRORS.WENT_WRONG;
  }

  if (isLoading) {
    return 'Loading ...';
  }

  const handleFilterVehicles = (filteredVehicles: Vehicle[] | []) => {
    setFilteredVehicles(filteredVehicles);
  };

  const handleChangeListType = (listType: ListType) => {
    setListType(listType);
  };

  return (
    <div className="ships-page">
      <Filters
        vehicles={vehicles}
        onFilteredVehiclesChange={handleFilterVehicles}
        onChangeListType={handleChangeListType}
        activeFilter={listType}
      />
      <ShipsList
        vehicles={filteredVehicles as Vehicle[]}
        listType={listType}
      />
    </div>
  );
};

export default ShipsPage;
