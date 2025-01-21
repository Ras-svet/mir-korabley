import React from 'react';
import { Vehicle } from 'types';
import Filter from './components/filter';
import { INFO_TITLES } from '../../constants/ships-card';

interface FiltersProps {
  vehicles: Vehicle[];
  onFilteredVehiclesChange: (filteredVehicles: Vehicle[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ vehicles, onFilteredVehiclesChange }) => {
  const [typeFilter, setTypeFilter] = React.useState<string | null>(null);
  const [levelFilter, setLevelFilter] = React.useState<string | null>(null);
  const [nationFilter, setNationFilter] = React.useState<string | null>(null);

  const [searchType, setSearchType] = React.useState('');
  const [searchLevel, setSearchLevel] = React.useState('');
  const [searchNation, setSearchNation] = React.useState('');

  const uniqueNations = React.useMemo(() => {
    return [...new Set(vehicles.map((vehicle) => vehicle.nation.title))]
      .filter((nation) => nation.toLowerCase().startsWith(searchNation.toLowerCase()));
  }, [vehicles, searchNation]);

  const uniqueTypes = React.useMemo(() => {
    return [...new Set(vehicles.map((vehicle) => vehicle.type.title))]
      .filter((type) => type.toLowerCase().startsWith(searchType.toLowerCase()));
  }, [vehicles, searchType]);

  const uniqueLevels = React.useMemo(() => {
    return [...new Set(vehicles.map((vehicle) => vehicle.level.toString()))]
      .filter((level) => level.toLowerCase().startsWith(searchLevel.toLowerCase()));
  }, [vehicles, searchLevel]);

  const handleSelectFilter = (value: string, filterName: string) => {
    switch (filterName) {
      case INFO_TITLES.TYPE:
        setTypeFilter(value);
        setSearchType('');
        break;
      case INFO_TITLES.LEVEL:
        setLevelFilter(value);
        setSearchLevel('')
        break;
      case INFO_TITLES.NATION:
        setNationFilter(value);
        setSearchNation('');
        break;
    }
  }

  const handleSearchFilter = (value: string, filterName: string) => {
    switch (filterName) {
      case INFO_TITLES.TYPE:
        setSearchType(value);
        break;
      case INFO_TITLES.LEVEL:
        setSearchLevel(value);
        break;
      case INFO_TITLES.NATION:
        setSearchNation(value);
        break;
    }
  }

  const filteredVehicles = React.useMemo(() => {
    return vehicles.filter((vehicle) => {
      return (
        (!typeFilter || vehicle.type.title === typeFilter) &&
        (!levelFilter || vehicle.level.toString() === levelFilter) &&
        (!nationFilter || vehicle.nation.title === nationFilter)
      );
    });
  }, [vehicles, typeFilter, levelFilter, nationFilter]);

  React.useEffect(() => {
    onFilteredVehiclesChange(filteredVehicles);
  }, [filteredVehicles, onFilteredVehiclesChange]);

  return (
    <div className="filters">
      <Filter
        filterType={INFO_TITLES.TYPE}
        onSelectFilter={handleSelectFilter}
        uniqueValues={uniqueTypes}
        selectedFilter={typeFilter}
        onSearchFilter={handleSearchFilter}
      />
      <Filter
        filterType={INFO_TITLES.LEVEL}
        onSelectFilter={handleSelectFilter}
        uniqueValues={uniqueLevels}
        selectedFilter={levelFilter}
        onSearchFilter={handleSearchFilter}
      />
      <Filter
        filterType={INFO_TITLES.NATION}
        onSelectFilter={handleSelectFilter}
        uniqueValues={uniqueNations}
        selectedFilter={nationFilter}
        onSearchFilter={handleSearchFilter}
      />
    </div>
  );
};

export default Filters;
