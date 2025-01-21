import React from 'react';

interface FilterSearchProps {
  onSearch: (serachString: string) => void;
}

const FilterSearch: React.FC<FilterSearchProps> = (props) => {
  const { onSearch } = props;
  const [ searchString, setSearchString ] = React.useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event?.target?.value);
    onSearch(event?.target?.value);
  };

  return (
    <div className="filter-search">
      <input
        className="filter-search__input"
        type="text"
        value={searchString}
        placeholder='Поиск по названию...'
        onChange={(event) => handleSearch(event)}
      />
    </div>
  );
};

export default FilterSearch;
