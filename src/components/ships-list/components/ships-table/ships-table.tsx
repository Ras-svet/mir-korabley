import React from 'react';
import { Vehicle } from 'types';
import cn from 'classnames';
import { countryNameMap } from '../../../../utils/countryNameMap';
import { INFO_TITLES } from '../../../../constants/ships-card';

interface ShipsTableProps {
  onChangePage: (page: number) => void;
  vehiclesToShow: Vehicle[];
  totalPages: number;
  currentPage: number;
  onSort: (key: string) => void
  sortKey: string;
  sortDirection: string;
}

const ShipsTable: React.FC<ShipsTableProps> = (props) => {
  const {
    onChangePage,
    vehiclesToShow,
    totalPages,
    currentPage,
    onSort,
    sortKey,
    sortDirection,
  } = props;

  const handleNextPage = () => {
    onChangePage(currentPage + 1);
  };

  const handlePrevPage = () => {
    onChangePage(currentPage - 1);
  }

  const handleSort = (key: string) => {
    onSort(key);
  };

  return (
    <div className="ships-list__table-block">
      <table className="ships-list__table">
        <thead>
          <tr>
            <th
              className={cn(
                sortKey === 'nation' && sortDirection === 'desc' && 'ships-list__table-th_active',
              )}
              onClick={() => handleSort('nation')}
            >
              {INFO_TITLES.NATION}
            </th>
            <th
              className={cn(
                sortKey === 'title' && sortDirection === 'desc' && 'ships-list__table-th_active',
              )}
              onClick={() => handleSort('title')}
            >
              {INFO_TITLES.NAME}
            </th>
            <th
              className={cn(
                sortKey === 'type' && sortDirection === 'desc' && 'ships-list__table-th_active',
              )}
              onClick={() => handleSort('type')}
            >
              {INFO_TITLES.TYPE}
            </th>
            <th
              className={cn(
                sortKey === 'level' && 'ships-list__table-th_active',
              )}
              onClick={() => handleSort('level')}
            >
              {INFO_TITLES.LEVEL}
            </th>
          </tr>
        </thead>
        <tbody>
          {vehiclesToShow.map((vehicle, index) => (
            <tr key={index}>
              <td className="ships-list__table-cell">
                {countryNameMap[vehicle.nation.title] && (
                  <img
                    src={countryNameMap[vehicle.nation.title]}
                    alt={vehicle.nation.title}
                    decoding='async'
                    loading='lazy'
                  />
                )}
              </td>
              <td>{vehicle.title}</td>
              <td>{vehicle.type.title}</td>
              <td>{vehicle.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="ships-list__table-buttons">
        {currentPage > 1 && (
          <button
            className="ships-list__table-button"
            onClick={handlePrevPage}
            type="button"
          >
            🢦
          </button>
        )}
        <span className="ships-list__table-pages">
          {`${currentPage} / ${totalPages}`}
        </span>
        {currentPage < totalPages && (
          <button
            className="ships-list__table-button"
            onClick={handleNextPage}
            type="button"
          >
            🢧
          </button>
        )}
      </div>
    </div>
  );
};

export default ShipsTable;
