"use client";
import Head from 'next/head';
import { useEffect, useState } from 'react';
import DoctorCard from './components/DoctorCard';
import FilterSidebar from './components/FilterSidebar';
import Header from './components/Header';

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({ specialty: '', city: '' });
  const [adds, setAdds] = useState({
    id: '',
    name: '',
    specialty: '',
    experience: '',
    rating: '',
    city: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchDoctors = async () => {
    const params = new URLSearchParams(filters);
    const res = await fetch(`https://doctor-app-cyan.vercel.app/api/list-doctor-with-filter?${params}`);
    const data = await res.json();
    setDoctors(data.doctors);
  };

  const addDoctor = async () => {
    const res = await fetch(`hhttps://doctor-app-cyan.vercel.app/api/add-doctor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adds),
    });

    const data = await res.json();
    if (data.success) {
      alert('Doctor added successfully!');
      setShowAddForm(false);
      fetchDoctors();
    } else {
      alert(data.message || 'Error adding doctor');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [filters]);

  return (
    <>
      <Head>
        <title>General Physician | Apollo Clone</title>
        <meta name="description" content="Find experienced general physicians near you. Apollo 247 Clone Demo." />
      </Head>

      <Header />
      <button onClick={() => setShowAddForm(!showAddForm)} className='add-button'>
        {showAddForm ? 'Back to List' : 'Add Doctor'}
      </button>

      <main className="main">
        {showAddForm ? (
          <div className="filter-sidebar">
            <h4>Add Doctor</h4>
            <input placeholder="ID" type="number" onChange={(e) => setAdds({ ...adds, id: e.target.value })} />
            <input placeholder="Name" onChange={(e) => setAdds({ ...adds, name: e.target.value })} />
            <input placeholder="Specialty" onChange={(e) => setAdds({ ...adds, specialty: e.target.value })} />
            <input placeholder="Experience (years)" type="number" onChange={(e) => setAdds({ ...adds, experience: e.target.value })} />
            <input placeholder="Rating (0-5)" type="number" step="0.1" onChange={(e) => setAdds({ ...adds, rating: e.target.value })} />
            <input placeholder="City" onChange={(e) => setAdds({ ...adds, city: e.target.value })} />
            <button onClick={addDoctor}>Submit</button>
          </div>
        ) : (
          <>
            <FilterSidebar onFilterChange={setFilters} />
            <div className="doctor-list">
              {Array.isArray(doctors) && doctors.length > 0 ? (
                doctors.map((doc, i) => <DoctorCard key={i} doctor={doc} />)
              ) : (
                <h1>NO DATA FOUND!</h1>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}
