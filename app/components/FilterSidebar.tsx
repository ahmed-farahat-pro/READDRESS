import { useState, useEffect } from 'react';
import styles from '../styles/FilterSidebar.module.css';

const propertyTypes = [
  'Apartment', 'House', 'Condo', 'Villa', 'Townhouse', 'Studio', 'Penthouse',
  'Duplex', 'Triplex', 'Loft', 'Flat', 'Bungalow', 'Cottage', 'Mansion',
  'Farmhouse', 'Land', 'Commercial', 'Office Space', 'Retail Space',
  'Warehouse', 'Industrial'
];

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    propertyType: [],
    priceRange: [0, 1000000], // Example range
    areaRange: [0, 10000], // Example range
    bedrooms: [],
    bathrooms: [],
    rentalType: [] // New filter for rental type
  });

  const [isPropertyTypeOpen, setPropertyTypeOpen] = useState(false);
  const [isBedroomsOpen, setBedroomsOpen] = useState(false);
  const [isBathroomsOpen, setBathroomsOpen] = useState(false);
  const [isRentalTypeOpen, setRentalTypeOpen] = useState(false);

  useEffect(() => {
    // Initialize filters state with current values from props
    onFilterChange(filters);
  }, [filters]);

  const handleCheckboxChange = (e, filterType) => {
    const { value, checked } = e.target;
    const convertedValue = filterType === 'propertyType' || filterType === 'rentalType' ? value : parseInt(value, 10);

    setFilters(prevFilters => {
      const updatedFilter = checked
        ? [...prevFilters[filterType], convertedValue]
        : prevFilters[filterType].filter(item => item !== convertedValue);

      const newFilters = {
        ...prevFilters,
        [filterType]: updatedFilter
      };
      onFilterChange(newFilters);
      console.log(newFilters);
      return newFilters;
    });
  };

  const handleRangeChange = (e, filterType) => {
    const { name, value } = e.target;
    const newValue = Number(value);

    setFilters(prevFilters => {
      const isArray = Array.isArray(prevFilters[filterType]);

      if (!isArray) {
        console.error(`Filter type ${filterType} is not an array.`);
        return prevFilters;
      }

      const updatedRange = [...prevFilters[filterType]];

      if (name === 'min') {
        updatedRange[0] = newValue;
      } else if (name === 'max') {
        updatedRange[1] = newValue;
      }

      const newFilters = {
        ...prevFilters,
        [filterType]: updatedRange
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const toggleSection = (section) => {
    if (section === 'propertyType') setPropertyTypeOpen(!isPropertyTypeOpen);
    if (section === 'bedrooms') setBedroomsOpen(!isBedroomsOpen);
    if (section === 'bathrooms') setBathroomsOpen(!isBathroomsOpen);
    if (section === 'rentalType') setRentalTypeOpen(!isRentalTypeOpen);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.filterGroup}>
        <h3 onClick={() => toggleSection('propertyType')} className={styles.filterHeader}>
          Property Type
        </h3>
        {isPropertyTypeOpen && (
          <div className={styles.filterOptions}>
            {propertyTypes.map(type => (
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
        )}
      </div>

      <div className={styles.filterGroup}>
        <h3>Price Range</h3>
        <input
          type="number"
          name="min"
          style={{color:"#000", width:"80px"}}
          value={filters.priceRange[0]}
          onChange={(e) => handleRangeChange(e, 'priceRange')}
        />
        <input
          type="number"
          name="max"
          style={{color:"#000",width:"80px"}}
          value={filters.priceRange[1]}
          onChange={(e) => handleRangeChange(e, 'priceRange')}
        />
      </div>

      <div className={styles.filterGroup}>
        <h3>Area Range</h3>
        <input
          type="number"
          name="min"
          style={{color:"#000",width:"80px"}}
          value={filters.areaRange[0]}
          onChange={(e) => handleRangeChange(e, 'areaRange')}
        />
        <input
          type="number"
          name="max"
          style={{color:"#000",width:"80px"}}
          value={filters.areaRange[1]}
          onChange={(e) => handleRangeChange(e, 'areaRange')}
        />
      </div>

      <div className={styles.filterGroup}>
        <h3 onClick={() => toggleSection('bedrooms')} className={styles.filterHeader}>
          Bedrooms
        </h3>
        {isBedroomsOpen && (
          <div className={styles.filterOptions}>
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
        )}
      </div>

      <div className={styles.filterGroup}>
        <h3 onClick={() => toggleSection('bathrooms')} className={styles.filterHeader}>
          Bathrooms
        </h3>
        {isBathroomsOpen && (
          <div className={styles.filterOptions}>
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
        )}
      </div>

      <div className={styles.filterGroup}>
        <h3 onClick={() => toggleSection('rentalType')} className={styles.filterHeader}>
          Rental Type
        </h3>
        {isRentalTypeOpen && (
          <div className={styles.filterOptions}>
            <label>
              <input
                type="checkbox"
                value="buy"
                checked={filters.rentalType.includes('buy')}
                onChange={(e) => handleCheckboxChange(e, 'rentalType')}
              />
              For Sale
            </label>
            <label>
              <input
                type="checkbox"
                value="rent"
                checked={filters.rentalType.includes('rent')}
                onChange={(e) => handleCheckboxChange(e, 'rentalType')}
              />
              For Rent
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
