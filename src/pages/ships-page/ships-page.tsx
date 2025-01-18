import React from 'react';
import { useVehicles } from '../../hooks/use-vehicles';
import { ERRORS } from '../../constants/errors';
import ShipsList from '../../components/ships-list/ships-list';
import { Vehicle } from 'types';

const ShipsPage = () => {
  const {
    vehicles,
    isLoading,
    error
  } = useVehicles();

  if (error) {
    return (ERRORS.WENT_WRONG)
  }
  if (isLoading) {
    return 'Loading ...'
  }

  return (
    <div className="ships-page">
      <ShipsList vehicles={vehicles as Vehicle[]} />
    </div>
  )
}

export default ShipsPage;
