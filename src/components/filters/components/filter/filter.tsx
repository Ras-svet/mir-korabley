import React from 'react';
import cn from 'classnames';

interface FilterProps {
  uniqueValues: string[];
  onSelectFilter: (value: string, filterName: string) => void;
  selectedFilters: (string | null)[];
  filterType: string;
}

const Filter: React.FC<FilterProps> = (props) => {
  const {
    uniqueValues,
    onSelectFilter,
    selectedFilters,
    filterType,
  } = props;

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [hasSelectedFilters, setHasSelectedFilters] = React.useState(false);

  const handleSelectFilter = (selectedFilter: string) => {
    onSelectFilter(selectedFilter, filterType);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    setHasSelectedFilters(selectedFilters.length > 0);
  }, [selectedFilters]);
  
  return (
    <div
      className="filter"
      ref={dropdownRef}
    >
      <div
        className={cn(
          'filter__input-container',
          isDropdownOpen && 'filter__input-container_opened',
          hasSelectedFilters && 'filter__input-container_not-empty',
        )}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        {filterType}
      </div>

      {isDropdownOpen && (
        <ul className="filter__dropdown">
          {uniqueValues.map((value) => (
            <li
              className="filter__dropdown-item"
              key={value}
            >
              <input
                type="checkbox"
                value={value}
                checked={selectedFilters.includes(value)}
                onChange={() => handleSelectFilter(value)}
                style={{ marginRight: '8px' }}
              />
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};

export default Filter;