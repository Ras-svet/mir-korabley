import React from 'react';

interface FilterProps {
  uniqueValues: string[];
  onSelectFilter: (value: string, filterName: string) => void;
  selectedFilter: string | null;
  filterType: string;
  onSearchFilter: (value: string, filterName: string) => void;
}

const Filter: React.FC<FilterProps> = (props) => {
  const {
    uniqueValues,
    onSelectFilter,
    selectedFilter,
    filterType,
    onSearchFilter,
  } = props;

  const [ searchString, setSearchString ] = React.useState<string>('');

  const handleSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event?.target?.value ?? '';
    setSearchString(searchString);
    onSearchFilter(searchString, filterType);
  };

  const handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event?.target?.value;
    setSearchString('');
    onSelectFilter(selectedFilter, filterType);
  };
  
  return (
    <div className="filter">
    <label htmlFor="filter-search">{filterType}:</label>
    <div className="filter-input-container">
      <input
        type="text"
        id="filter-search"
        placeholder={selectedFilter && selectedFilter != '' ? selectedFilter : `Искать ${filterType.toLowerCase()}...`}
        value={searchString}
        onChange={(event) => handleSearchFilter(event)}
      />
      <select
        id="nation-filter"
        value={selectedFilter || ''}
        onChange={(event) => handleSelectFilter(event)}
        className="filter-select"
      >
        <option value="">▼</option>
        {uniqueValues.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  </div>
  )
};

export default Filter;