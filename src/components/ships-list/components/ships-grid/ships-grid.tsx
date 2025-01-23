import React from 'react';
import { Vehicle } from 'types';
import ShipsCard from '../../../ships-card/ships-card';
import { DEFAULT_BUTTONS } from '../../../../constants/global';

interface ShipsGridProps {
  onLoadMore: () => void;
  vehiclesToShow: Vehicle[];
  currentPage: number;
  totalPages: number;
}

const ShipsGrid: React.FC<ShipsGridProps> = (props) => {
  const {
    onLoadMore,
    vehiclesToShow,
    currentPage,
    totalPages,
  } = props;

  const handleLoadMore = () => {
    onLoadMore();
  };

  return (
    <div className="ships-list__grid-block">
      <ul className="ships-list__grid">
        {vehiclesToShow?.map((vehicle, index) => (
          <ShipsCard
            vehicle={vehicle}
            key={index}
          />
        ))}
      </ul>
      {currentPage < totalPages && (
        <button
          className="ships-list__button"
          type="button"
          onClick={handleLoadMore}
        >
          {DEFAULT_BUTTONS.LOAD_MORE}
        </button>
      )}
    </div>
  );
};

export default ShipsGrid;