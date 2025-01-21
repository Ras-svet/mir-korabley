import React from 'react';
import { Vehicle } from 'types';
import ShipsCard from '../ships-card/ships-card';
import {
  DESKTOP_PER_PAGE,
  MOBILE_PER_PAGE,
  TABLET_PER_PAGE,
} from '../../constants/ships-card';
import EmptyList from '../empty-list/empty-list';

interface ShipsListProps {
  vehicles: Vehicle[] | [];
}

const ShipsList: React.FC<ShipsListProps> = (props) => {
  const { vehicles } = props;
  const [vehiclesToShow, setVehiclesToShow] = React.useState<Vehicle[]>([]);
  const [page, setPage] = React.useState(1);
  const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);

  const itemsPerPage = React.useMemo(() => {
    if (windowWidth >= DESKTOP_PER_PAGE.SIZE) {
      return DESKTOP_PER_PAGE.ITEMS * 3;
    }
    if (windowWidth >= TABLET_PER_PAGE.SIZE && windowWidth < DESKTOP_PER_PAGE.SIZE) {
      return TABLET_PER_PAGE.ITEMS * 3;
    }
    if (windowWidth >= MOBILE_PER_PAGE.SIZE && windowWidth < TABLET_PER_PAGE.SIZE) {
      return MOBILE_PER_PAGE.ITEMS * 5;
    }
    return 10;
  }, [windowWidth]);
  const totalPages = Math.ceil(vehicles.length / itemsPerPage);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setVehiclesToShow(vehicles.slice(0, endIndex));
  }, [
    page,
    vehicles,
    itemsPerPage,
  ]);

  return (
    <div className="ships-list">
      {Array.isArray(vehicles) && vehicles.length > 0 && (
        <>
          <ul className="ships-list__list">
            {vehiclesToShow?.map((vehicle, index) => (
              <ShipsCard
                vehicle={vehicle}
                key={index}
              />
            ))}
          </ul>
          <button
            className="ship-list__button"
            type="button"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </>
      )}
      {Array.isArray(vehicles) && vehicles.length === 0 && (
        <EmptyList
          isEmpty={true}
          emptyText={'No ships'}
        />
      )}
    </div>
  )
};

export default ShipsList;
