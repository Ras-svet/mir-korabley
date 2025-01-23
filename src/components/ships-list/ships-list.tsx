import React from 'react';
import {
  ListType,
  Vehicle,
 } from 'types';
import {
  DESKTOP_PER_PAGE,
  MOBILE_PER_PAGE,
  TABLET_PER_PAGE,
} from '../../constants/ships-card';
import EmptyList from '../empty-list/empty-list';
import ShipsGrid from './components/ships-grid/ships-grid';
import { LIST_TYPES } from '../../constants/global';
import ShipsTable from './components/ships-table/ships-table';
import { ERRORS } from '../../constants/errors';

interface ShipsListProps {
  vehicles: Vehicle[] | [];
  listType: ListType;
}

const ShipsList: React.FC<ShipsListProps> = (props) => {
  const {
    vehicles,
    listType,
  } = props;
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

  const handleChangePage = (page: number) => {
    setPage(page);
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
    if (listType === LIST_TYPES.GRID) {
      setVehiclesToShow(vehicles.slice(0, endIndex));
    } else if (listType === LIST_TYPES.TABLE) {
      setVehiclesToShow(vehicles.slice(startIndex, endIndex));
    }
  }, [
    page,
    vehicles,
    itemsPerPage,
    listType,
  ]);

  React.useEffect(() => {
    setPage(1);
  }, [listType]);

  return (
    <div className="ships-list">
      {Array.isArray(vehicles) && vehicles.length > 0 && (
        <>
          {listType === LIST_TYPES.GRID && (
            <ShipsGrid
              onLoadMore={handleLoadMore}
              vehiclesToShow={vehiclesToShow}
              currentPage={page}
              totalPages={totalPages}
            />
          )}
          {listType === LIST_TYPES.TABLE && (
            <ShipsTable
              onChangePage={handleChangePage}
              vehiclesToShow={vehiclesToShow}
              totalPages={totalPages}
              currentPage={page}
            />
          )}
        </>
      )}
      {Array.isArray(vehicles) && vehicles.length === 0 && (
        <EmptyList
          isEmpty={true}
          emptyText={ERRORS.EMPTY_LIST}
        />
      )}
    </div>
  )
};

export default ShipsList;
