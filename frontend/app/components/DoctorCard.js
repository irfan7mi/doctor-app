export default function DoctorCard({ doctor }) {
    return (
      <div className="doctor-card">
        <h3>{doctor.name}</h3>
        <p>Specialty: {doctor.specialty}</p>
        <p>Experience: {doctor.experience} yrs</p>
        <p>Rating: {doctor.rating}/5</p>
        <p>City: {doctor.city}</p>
      </div>
    );
  }
  