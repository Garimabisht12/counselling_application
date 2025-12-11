import { useEffect, useState } from 'react';
import { useStuApi }           from '@/api/studentApi';
import { useStudentAuth }      from '@/context/StudentAuth';
import Navbar from '@/components/Navbar/Navbar';

export default function Dashboard() {
  const api = useStuApi();
  const { student: cached, logout, login } = useStudentAuth();
  const [profile, setProfile] = useState(cached);  // keep local copy
  const [msg, setMsg] = useState('');

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    const { data } = await api.get('/student/me');
    setProfile(data.student);
    login(localStorage.getItem('stuToken'), data.student); // sync context
  };

  /* Accept / Reject actions */
  const decide = async (decision) => {
    await api.put('/student/decision', { decision });
    setMsg(`You have ${decision.toLowerCase()}ed the seat.`);
    fetchProfile();
  };

  /* RENDER LOGIC */
  if (!profile?.marks || !profile.preferences?.length) {
    // user accessed dashboard without form
    return (<>
   
    <div className='flex justify-center items-center flex-col h-screen'>
      <h1 className='font-medium text-2xl'>Oops! not filled form...</h1>
    <p className="text-sm">Please fill the admission form first.</p>
    <a href="/admissionform" className='underline text-blue-600'>Form</a>

      <button onClick={logout} className=" text-m mt-6 py-2.5 px-5 underlined">Logout</button>
      
    </div>
    </>
    )
  }

  return (
    <>
      <Navbar/>
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Welcome, {profile.name}</h2>

      <div className="border p-4 rounded bg-gray-50 space-y-1">
        <p><strong>Total Marks:</strong> {profile.total}</p>
        <p><strong>Preference(s):</strong> {profile.preferences.join(', ')}</p>
        {profile.allocatedBranch && (
          <p><strong>Allocated Branch:</strong> {profile.allocatedBranch}</p>
        )}
      </div>

      {/* Status-specific UI */}
      {!profile.allocatedBranch && (
        <p>Your form has been submitted. Please wait for seat allocation.</p>
      )}

      {profile.allocatedBranch && profile.status === 'Pending' && (
        <div className="space-x-2">
          <button onClick={()=>decide('Accepted')}
            className="bg-green-600 text-white px-3 py-1 rounded">Accept</button>
          <button onClick={()=>decide('Rejected')}
            className="bg-red-600 text-white px-3 py-1 rounded">Reject</button>
        </div>
      )}

      {profile.status === 'Accepted' && (
        <p className="text-green-700">
          You have accepted the seat in <strong>{profile.allocatedBranch}</strong>.
          <br/>Thank you!
        </p>
      )}

      {profile.status === 'Rejected' && (
        <p className="text-red-700">
          You have rejected the seat in <strong>{profile.allocatedBranch}</strong>.
          <br/>Thank you for your response.
        </p>
      )}

      {msg && <p className="text-blue-600">{msg}</p> }

      <button onClick={logout} className="bg-sky-500 hover:bg-sky-700  text-m mt-6 py-2.5 px-5 rounded-full">Logout</button>
      
    </div>
    </>
  );
}
