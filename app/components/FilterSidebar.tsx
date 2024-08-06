import { useState } from 'react';
import styles from '../styles/FilterSidebar.module.css';

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    propertyType: [],
    priceRange: [0, 1000000], // Example range
    areaRange: [0, 10000], // Example range
    bedrooms: [],
    bathrooms: []
  });
   const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleCheckboxChange = (e, filterType) => {
    const { value, checked } = e.target;
    setFilters(prevFilters => {
      const updatedFilter = checked
        ? [...prevFilters[filterType], value]
        : prevFilters[filterType].filter(item => item !== value);

      const newFilters = {
        ...prevFilters,
        [filterType]: updatedFilter
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleRangeChange = (e, filterType) => {
    const { name, value } = e.target;
    const newValue = Number(value); // Convert value to number

    setFilters(prevFilters => {
      // Check if filterType is an array
      const isArray = Array.isArray(prevFilters[filterType]);

      if (!isArray) {
        console.error(`Filter type ${filterType} is not an array.`);
        return prevFilters;
      }

      const updatedRange = [...prevFilters[filterType]]; // Copy current range

      if (name === 'min') {
        updatedRange[0] = newValue; // Update min value
      } else if (name === 'max') {
        updatedRange[1] = newValue; // Update max value
      }

      const newFilters = {
        ...prevFilters,
        [filterType]: updatedRange
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
       
    <div >
           <button className={styles.sidebarToggle} onClick={toggleSidebar}>
        {sidebarVisible ? 'Hide Filters' : 'Show Filters'}
      </button>
       <div className=  {` styles.sidebar ${sidebarVisible ? styles.show : styles.hidden}`}>
 <h2>Filters</h2>

      <div className={styles.filterGroup}>
        <h3>Property Type</h3>
        {['Apartment', 'House', 'Condo', 'Villa', 'Townhouse'].map(type => (
          <label key={type}>
            <input
              type="checkbox"
              value={type}
              checked={filters.propertyType.includes(type)}
              onChange={(e) => handleCheckboxChange(e, 'propertyType')}
            />
            {type}
          </label>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <h3>Price Range</h3>
        <input
          type="number"
          name="min"
          style={{color:"#000"}}
          value={filters.priceRange[0]}
          onChange={(e) => handleRangeChange(e, 'priceRange')}
        />
        <input
          type="number"
          name="max"
          style={{color:"#000"}}
          value={filters.priceRange[1]}
          onChange={(e) => handleRangeChange(e, 'priceRange')}
        />
      </div>

      <div className={styles.filterGroup}>
        <h3>Area Range</h3>
        <input
          type="number"
          name="min"
          style={{color:"#000"}}
          value={filters.areaRange[0]}
          onChange={(e) => handleRangeChange(e, 'areaRange')}
        />
        <input
          type="number"
          name="max"
          style={{color:"#000"}}
          value={filters.areaRange[1]}
          onChange={(e) => handleRangeChange(e, 'areaRange')}
        />
      </div>

      <div className={styles.filterGroup}>
        <h3>Bedrooms</h3>
        {[1, 2, 3, 4, 5].map(num => (
          <label key={num}>
            <input
              type="checkbox"
              value={num}
              checked={filters.bedrooms.includes(num)}
              onChange={(e) => handleCheckboxChange(e, 'bedrooms')}
            />
            {num}
          </label>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <h3>Bathrooms</h3>
        {[1, 2, 3, 4, 5].map(num => (
          <label key={num}>
            <input
              type="checkbox"
              value={num}
              checked={filters.bathrooms.includes(num)}
              onChange={(e) => handleCheckboxChange(e, 'bathrooms')}
            />
            {num}
          </label>
        ))}
      </div>


       </div>
     
    </div>
  );
};

export default FilterSidebar;
