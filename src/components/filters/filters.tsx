import React from 'react';
import { ListType, Vehicle } from 'types';
import cn from 'classnames';
import Filter from './components/filter/filter';
import { INFO_TITLES } from '../../constants/ships-card';
import FilterSearch from './components/filter-search/filter-search';
import { LIST_TYPES } from '../../constants/global';

interface FiltersProps {
  vehicles: Vehicle[];
  onFilteredVehiclesChange: (filteredVehicles: Vehicle[]) => void;
  onChangeListType: (listType: ListType) => void;
  activeFilter: ListType;
}

const Filters: React.FC<FiltersProps> = (props) => {
  const {
    vehicles,
    onFilteredVehiclesChange,
    onChangeListType,
    activeFilter,
  } = props;
  const [typeFilters, setTypeFilters] = React.useState<(string)[]>([]);
  const [levelFilters, setLevelFilters] = React.useState<(string)[]>([]);
  const [nationFilters, setNationFilters] = React.useState<(string)[]>([]);
  const [searchString, setSearchString] = React.useState<string>('');

  const uniqueNations = React.useMemo(() => {
    return [...new Set(vehicles.map((vehicle) => vehicle.nation.title))]
  }, [vehicles]);

  const uniqueTypes = React.useMemo(() => {
    return [...new Set(vehicles.map((vehicle) => vehicle.type.title))]
  }, [vehicles]);

  const uniqueLevels = React.useMemo(() => {
    return [...new Set(vehicles.map((vehicle) => vehicle.level.toString()))]
  }, [vehicles]);

  const handleSetFilters = (
    setFilters: React.Dispatch<React.SetStateAction<(string)[]>>,
    value: string
  ) => {
    setFilters((prevFilters) => {
      if (prevFilters.includes(value)) {
        return prevFilters.filter((filter) => filter !== value);
      }
      return [...prevFilters, value];
    });
  };

  const handleSelectFilter = (value: string, filterName: string) => {
    switch (filterName) {
      case INFO_TITLES.TYPE:
        handleSetFilters(setTypeFilters, value)
        break;
      case INFO_TITLES.LEVEL:
        handleSetFilters(setLevelFilters, value)
        break;
      case INFO_TITLES.NATION:
        handleSetFilters(setNationFilters, value)
        break;
    }
  }

  const handleChangeSearchString = (value: string) => {
    setSearchString(value);
  };

  const filteredVehicles = React.useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesTypeFilter =
        typeFilters.length === 0 || typeFilters.some((filter) => filter === vehicle.type.title);
  
      const matchesLevelFilter =
        levelFilters.length === 0 || levelFilters.some((filter) => Number(filter) === vehicle.level);
  
      const matchesNationFilter =
        nationFilters.length === 0 || nationFilters.some((filter) => filter === vehicle.nation.title);
      
      const matchesSearchString =
        searchString === '' || vehicle.title.startsWith(searchString);
  
      return matchesTypeFilter && matchesLevelFilter && matchesNationFilter && matchesSearchString;
    });
  }, [
    vehicles,
    typeFilters,
    levelFilters,
    nationFilters,
    searchString,
  ]);

  React.useEffect(() => {
    onFilteredVehiclesChange(filteredVehicles);
  }, [filteredVehicles]);
  
  const handleChangeListType = (listType: ListType) => {
    onChangeListType(listType);
  };

  return (
    <div className="filters">
      <div className="filters-right">
        <Filter
          filterType={INFO_TITLES.TYPE}
          onSelectFilter={handleSelectFilter}
          uniqueValues={uniqueTypes}
          selectedFilters={typeFilters}
        />
        <Filter
          filterType={INFO_TITLES.LEVEL}
          onSelectFilter={handleSelectFilter}
          uniqueValues={uniqueLevels}
          selectedFilters={levelFilters}
        />
        <Filter
          filterType={INFO_TITLES.NATION}
          onSelectFilter={handleSelectFilter}
          uniqueValues={uniqueNations}
          selectedFilters={nationFilters}
        />
      </div>
      <div className="filters-left">
        <FilterSearch onSearch={handleChangeSearchString} />
        <div className="filters-left__types">
          <button
            className={cn(
              'filters-left__types-button',
              'filters-left__types-button_grid',
              activeFilter === LIST_TYPES.GRID && 'filters-left__types-button_active',
            )}
            type="button"
            onClick={() => handleChangeListType(LIST_TYPES.GRID)}
          />
          <button
            className={cn(
              'filters-left__types-button',
              'filters-left__types-button_table',
              activeFilter === LIST_TYPES.TABLE && 'filters-left__types-button_active',
            )}
            type="button"
            onClick={() => handleChangeListType(LIST_TYPES.TABLE)}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
