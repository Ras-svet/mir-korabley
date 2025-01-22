import React from 'react';

interface EmptyListProps {
  emptyText: string;
  isEmpty: boolean;
  // onClearFilters: () => void;
}

const EmptyList: React.FC<EmptyListProps> = (props) => {
  const {
    emptyText,
    isEmpty,
    // onClearFilters,
  } = props;

  return (
    <div className="empty-list">
      {isEmpty && (
        <div
          style={{
            maxWidth: '200px',
            height: '200px',
            position: 'relative',
            maxHeight: '200px',
          }}
        >
          <iframe
            src="https://giphy.com/embed/sFREJzgEFWrmSRZNys"
            width="200px"
            height="200px"
            frameBorder="0"
            className="giphy-embed"
          ></iframe>
        </div>
      )}
      <p
        className="empty-list__text"
        // onClick={onClearFilters}
      >
        {emptyText}
      </p>
    </div>
  );  
};

export default EmptyList;
