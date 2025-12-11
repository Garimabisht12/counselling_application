import { useEffect, useState } from 'react';
import { useAdminApi } from '@/api/adminApi';
import { useAdminAuth } from '@/context/AdminAuth';
import Navbar from '@/components/Navbar/Navbar';

export default function AdminView() {
  const api = useAdminApi();
  const {logout} = useAdminAuth();
  const [students, setStudents]   = useState([]);
  const [branches, setBranches]   = useState([]);
  const [newAlloc, setNewAlloc]   = useState([]);
const [choice, setChoice] = useState({}); // { studentId: 'CSE' }

const [branchMap, setBranchMap] = useState({});  // code → seatsLeft


const manualAllocate = async (stuId, branch) => {
  try {
    await api.patch(`/student/${stuId}/allocate`, { branch });
    fetchStudents();
    fetchBranches();
    setChoice({ ...choice, [stuId]: '' });   // reset dropdown
  } catch (err) {

    alert(err.response?.data?.message || 'Error allocating seat');
  }
};


const fetchBranches = async () => {
  const { data } = await api.get('/branches');
  setBranches(data);
  setBranchMap(Object.fromEntries(data.map(b => [b.code, b.seatsLeft])));
};


  /* ---------- fetch helpers ---------- */
  const fetchStudents = async () => {
    const { data } = await api.get('/students');
    setStudents(data);
  };
  

  /* ---------- allocate seats ---------- */
  // const allocate = async () => {
  //   const { data } = await api.patch('/allocate');
  //   setNewAlloc(data.changes);    // show modal/table
  //   fetchStudents();
  //   fetchBranches();
  // };

  /* ---------- status change ---------- */
  // const changeStatus = async (id, status) => {
  //   await api.patch(`/student/${id}/status`, { status });
  //   fetchStudents();
  // };

  useEffect(() => {
    fetchStudents();
    fetchBranches();
  }, []);

  return (
    <>
    <Navbar />
    
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      {/* Seat summary table */}
      <table className="border w-full mb-4">
        <thead><tr className="bg-gray-200">
          <th>Branch</th><th>Seats</th><th>Left</th>
        </tr></thead>
        <tbody>
          {branches.map(b=>(
            <tr key={b.code} className="text-center border-t">
              <td>{b.code}</td>
              <td>{b.seatLimit}</td>
              <td>{b.seatsLeft}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <button onClick={allocate}
        className="bg-green-600 text-white px-4 py-2 rounded">
        Run Allocation
      </button> */}

        <hr className="bg-blue-500 font-bold p-3 mt-10 mb-5 border-0" />
      <h1 className="text-2xl font-semibold" >Applicants</h1>

      {/* Students table (existing) */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr><th>Name</th><th>Total</th><th>Branch</th><th>Status</th><th>Total</th><th>allocatedBranch</th><th>status</th></tr>
        </thead>
        <tbody>
          {students.map(s=>(
            <tr key={s._id} className="text-center border-t">
              <td>{s.name}</td>
              <td>{s.total}</td>
              <td>{s.allocatedBranch || '-'}</td>
              <td>{s.status}</td>
              {/* <td className="space-x-2">
                <button
                  disabled={s.status!=='Pending'}
                  onClick={()=>changeStatus(s._id,'Accepted')}
                  className={`px-2 py-1 text-sm rounded ${
                    s.status==='Pending' ? 'bg-blue-500 text-white' : 'bg-gray-400'
                  }`}>
                  Accept
                </button> */}

                
              {/* </td> */}
             
  {/* <td>{s.name}</td> */}
  <td>{s.total}</td>
  <td>{s.allocatedBranch || '-'}</td>
  <td>{s.status}</td>

  <td className="space-x-2">
    {s.allocatedBranch  ? (
      '—'   /* if already allocated, no controls */
    ) : (
      <>
        {/* dropdown of prefs that still have seats */}
        <select
  value={choice[s._id] || ''}
  onChange={(e) => setChoice({ ...choice, [s._id]: e.target.value })}
  className="border px-1"
>
  <option value="">—select—</option>

  {s.preferences.map((p) => {
    const seatsLeft = branchMap[p];          // undefined until fetched
    return (
      <option
        key={p}
        value={p}
        disabled={seatsLeft === 0}           // only disable if 0
      >
        {p} {seatsLeft === 0 ? '(full)' : ''}
      </option>
    );
  })}
</select>


        <button
          disabled={!choice[s._id] || branches[choice[s._id]] === 0}
          onClick={() => manualAllocate(s._id, choice[s._id])}
          className="bg-indigo-600 text-white px-2 py-1 rounded text-sm disabled:bg-gray-400"
        >
          Allocate
        </button>
      </>
    )}
  </td>

            </tr>
            
          ))}
        </tbody>
      </table>

      


      {/* New allocation popup (very simple) */}
      {newAlloc.length>0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-96 space-y-2">
            <h2 className="text-lg font-medium">New Allocations</h2>
            <ul className="max-h-60 overflow-y-auto list-disc pl-5">
              {newAlloc.map(a=>(
                <li key={a.id}>{a.name} → {a.branch}</li>
              ))}
            </ul>
            <button
              onClick={()=>setNewAlloc([])}
              className="bg-blue-600 text-white px-3 py-1 rounded w-full">
              Close
            </button>
          </div>
        </div>
      )}

    </div>
       {/*  logout button */}
  <button
    onClick={logout}
    className="bg-blue-500 hover:bg-sky-700  text-m mt-6 py-2.5 px-5 rounded-full"
  >
    Log&nbsp;out
  </button>
    </>
  );
}
