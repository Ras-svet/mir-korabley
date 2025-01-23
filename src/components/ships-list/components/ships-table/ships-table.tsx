import React from 'react';
import { Vehicle } from 'types';
import { countryNameMap } from '../../../../utils/countryNameMap';
import { INFO_TITLES } from '../../../../constants/ships-card';

interface ShipsTableProps {
  onChangePage: (page: number) => void;
  vehiclesToShow: Vehicle[];
  totalPages: number;
  currentPage: number;
}

const ShipsTable: React.FC<ShipsTableProps> = (props) => {
  const {
    onChangePage,
    vehiclesToShow,
    totalPages,
    currentPage,
  } = props;

  const handleNextPage = () => {
    onChangePage(currentPage + 1);
  };

  const handlePrevPage = () => {
    onChangePage(currentPage - 1);
  }

  return (
    <div className="ships-list__table-block">
      <table className="ships-list__table">
        <thead>
          <tr>
            <th>
              {INFO_TITLES.NATION}
            </th>
            <th>
              {INFO_TITLES.NAME}
            </th>
            <th>
              {INFO_TITLES.TYPE}
            </th>
            <th>
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
