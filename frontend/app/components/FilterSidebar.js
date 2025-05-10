"use client";
import { useState } from "react";

export default function FilterSidebar({ onFilterChange }) {
  const [specialty, setSpecialty] = useState('');
  const [city, setCity] = useState('');

  const handleFilter = () => {
    onFilterChange({ specialty, city });
  };

  return (
    <div className="filter-sidebar">
      <h4>Filters</h4>
      <input placeholder="Specialty" onChange={(e) => setSpecialty(e.target.value)} />
      <input placeholder="City" onChange={(e) => setCity(e.target.value)} />
      <button onClick={handleFilter}>Apply</button>
    </div>
  );
}
