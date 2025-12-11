import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStuApi }    from '@/api/studentApi';
import Navbar from '@/components/Navbar/Navbar';
import { useStudentAuth } from '@/context/StudentAuth';

export default function AdmissionForm() {
  const api = useStuApi();
  const nav = useNavigate();
  const [marks, setMarks] = useState({ physics:'', chemistry:'', maths:'' });
  const [prefs, setPrefs] = useState('');
  const { student: cached, logout, login } = useStudentAuth();
const [profile, setProfile] = useState(cached);  // keep local copy
 
  const submit = async (e) => {
    e.preventDefault();
    await api.put('/student/marks', marks);
    await api.put('/student/preferences', {
      preferences: prefs.split(',').map(p=>p.trim()).filter(Boolean),
    });
    nav('/dashboard');
  };

  

  return (
    <>
    <Navbar />
    <div className="p-6 max-w-lg mx-auto space-y-4 mt-7">
      <form onSubmit={submit} className="space-y-2 max-w-sm mx-auto ">
      <label htmlFor="name">Name:</label>
    <input type="text"id='name' value={profile.name}  className="border p-2 w-full" readOnly/>
    <label htmlFor="email">Email
      <input type="text" id='email' value={profile.email}  className="border p-2 w-full" readOnly/>
    </label>
      {['physics','chemistry','maths'].map((m)=>(
        <label htmlFor={m}> {m}
        <input key={m} required type="number" min="0" max="100"
          placeholder={`${m} marks`} className="border p-2 w-full"
          value={marks[m]} onChange={(e)=>setMarks({...marks,[m]:e.target.value})} />
        </label>
      ))}
      <label htmlFor="prefs">Preference</label>
      <input required id="prefs" placeholder="Branch prefs e.g. CSE,ECE,ME"
        className="border p-2 w-full"
        value={prefs} onChange={(e)=>setPrefs(e.target.value)} />
      <button className="bg-green-600 text-white w-full py-2 rounded">
        Submit Form
      </button>
    </form>
    
      <a href="/home">Home</a>
      </div>
    </>
  );
}
