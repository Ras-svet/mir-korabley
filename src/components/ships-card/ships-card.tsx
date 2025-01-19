import React from 'react';
import { Vehicle } from 'types';
import { INFO_TITLES } from '../../constants/ships-card';

interface ShipsCardProps {
  vehicle: Vehicle;
}

const ShipsCard: React.FC<ShipsCardProps> = ({ vehicle }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false); // Отслеживаем hover
  const descriptionRef = React.useRef<HTMLParagraphElement | null>(null);
  const [isTextOverflowing, setIsTextOverflowing] = React.useState(false);

  React.useEffect(() => {
    if (descriptionRef.current) {
      setIsTextOverflowing(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
    }
  }, [vehicle.description]);

  React.useEffect(() => {
    if (!isHovered) {
      setIsDescriptionExpanded(false);
    }
  }, [isHovered]);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <li
      className="ships-card"
      style={{
        zIndex: isDescriptionExpanded ? 10 : 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="ships-card__inner">
        <div
          className="ships-card__front"
          style={{
            height: isDescriptionExpanded ? 'auto' : '210px',
          }}
        >
          <img
            className="ships-card__image"
            src={vehicle.icons.large}
            alt={vehicle.title}
            decoding="async"
          />
          <span className="ships-card__title">{vehicle.title}</span>
        </div>
        <div
          className="ships-card__back"
          style={{
            height: isDescriptionExpanded ? 'auto' : '230px',
          }}
        >
          <div className="ships-card__info">
            <div className="ships-card__info-block">
              <span className="ships-card__info-span">
                {INFO_TITLES.TYPE}:
              </span>
              <p className="ships-card__info-text">
                {vehicle.type.title}
              </p>
            </div>
            <div className="ships-card__info-block">
              <span className="ships-card__info-span">
                {INFO_TITLES.LEVEL}:
              </span>
              <p className="ships-card__info-text">
                {vehicle.level}
              </p>
            </div>
            <div className="ships-card__info-block">
              <span className="ships-card__info-span">
                {INFO_TITLES.NATION}:
              </span>
              <p
                className="ships-card__info-text"
                style={{ color: vehicle.nation.color }}
              >
                {vehicle.nation.title}
              </p>
            </div>
          </div>
          <p
            ref={descriptionRef}
            className="ships-card__info-description"
            style={{
              height: isDescriptionExpanded ? 'auto' : '110px',
            }}
          >
            {vehicle.description}
            {isTextOverflowing && !isDescriptionExpanded && (
              <span
                className="ships-card__info-description-expand"
                onClick={toggleDescription}
              >
                Показать больше
              </span>
            )}
          </p>
        </div>
      </div>
    </li>
  );
};

export default ShipsCard;
