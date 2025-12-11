// src/pages/AdminView.jsx
import { useEffect, useState, useRef } from 'react';
import { useAdminApi } from '@/api/adminApi';
import { useAdminAuth } from '@/context/AdminAuth';
import Navbar from '@/components/Navbar/Navbar';

export default function AdminView() {
  const api = useAdminApi();
  const { logout } = useAdminAuth();

  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [newAlloc, setNewAlloc] = useState([]);
  const [choice, setChoice] = useState({});
  const [branchMap, setBranchMap] = useState({});

  // Refs for jump-to buttons
  const pendingRef = useRef(null);
  const acceptedRef = useRef(null);
  const rejectedRef = useRef(null);

  // --- API fetch functions ---
  const fetchBranches = async () => {
    try {
      const { data } = await api.get('/branches');
      setBranches(data || []);
      setBranchMap(Object.fromEntries((data || []).map(b => [b.code, b.seatsLeft])));
    } catch (err) {
      console.error('Failed to fetch branches', err);
    }
  };

  const fetchStudents = async () => {
    try {
      const { data } = await api.get('/students');
      setStudents(data || []);
    } catch (err) {
      console.error('Failed to fetch students', err);
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchStudents();
  }, []);

  // --- Manual allocation ---
  const manualAllocate = async (stuId, branch) => {
    try {
      await api.patch(`/student/${stuId}/allocate`, { branch });
      fetchStudents();
      fetchBranches();
      setChoice({ ...choice, [stuId]: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Error allocating seat');
    }
  };

  // --- Helpers ---
  const safeBranches = Array.isArray(branches) ? branches : [];
  const safeStudents = Array.isArray(students) ? students : [];

  const pendingUnallocated = safeStudents.filter(s => s.status === 'Pending' && !s.allocatedBranch);
  const pendingAwaitingAcceptance = safeStudents.filter(s => s.status === 'Pending' && s.allocatedBranch);

  const acceptedStudents = safeStudents.filter(s => s.status === 'Accepted');
  const rejectedStudents = safeStudents.filter(s => s.status === 'Rejected');

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide text-[#2c3e50]">
            Admissions Control Panel
          </h1>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* BRANCH AVAILABILITY */}
        <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-[#34495e]">
            Branch Seat Availability
          </h2>

          <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 border">Branch</th>
                <th className="py-2 border">Total Seats</th>
                <th className="py-2 border">Available</th>
              </tr>
            </thead>
            <tbody>
              {safeBranches.map((b) => (
                <tr key={b.code} className="text-center hover:bg-gray-50 transition">
                  <td className="py-2 border font-medium">{b.code}</td>
                  <td className="py-2 border">{b.seatLimit}</td>
                  <td className={`py-2 border font-semibold ${b.seatsLeft === 0 ? "text-red-600" : "text-green-700"}`}>
                    {b.seatsLeft}
                  </td>
                </tr>
              ))}
              {safeBranches.length === 0 && (
                <tr><td colSpan="3" className="py-3 text-gray-500">No branch data available</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TOP NAV BUTTONS FOR SECTIONS */}
        <div className="flex gap-3 justify-center">
          <button onClick={() => pendingRef.current.scrollIntoView({ behavior: 'smooth' })}
            className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
            Pending
          </button>
          <button onClick={() => acceptedRef.current.scrollIntoView({ behavior: 'smooth' })}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Accepted
          </button>
          <button onClick={() => rejectedRef.current.scrollIntoView({ behavior: 'smooth' })}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">
            Rejected
          </button>
        </div>

        {/* PENDING SECTION */}
        <div ref={pendingRef} className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
          <h3 className="text-lg font-bold mb-3 text-purple-700">Pending Applications</h3>

          {/* Unallocated */}
          {pendingUnallocated.length > 0 && (
            <>
              <p className="mb-2 font-medium text-gray-700">Not allocated yet</p>
              <table className="w-full border rounded-md overflow-hidden mb-4">
                <thead className="bg-purple-100 text-purple-800">
                  <tr>
                    <th className="py-2 border">Name</th>
                    <th className="py-2 border">Marks</th>
                    <th className="py-2 border">Allocate Branch</th>
                    <th className="py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingUnallocated.map(s => (
                    <tr key={s._id} className="text-center hover:bg-gray-50 transition">
                      <td className="py-2 border">{s.name}</td>
                      <td className="py-2 border">{s.total}</td>
                      <td className="py-2 border">
                        <select
                          value={choice[s._id] || ""}
                          onChange={e => setChoice({ ...choice, [s._id]: e.target.value })}
                          className="border px-2 py-1 rounded-md"
                        >
                          <option value="">Select</option>
                          {s.preferences.map(p => {
                            const seatsLeft = branchMap[p];
                            return <option key={p} value={p} disabled={seatsLeft === 0}>{p} {seatsLeft === 0 ? "(Full)" : ""}</option>
                          })}
                        </select>
                      </td>
                      <td className="py-2 border">
                        <button
                          disabled={!choice[s._id]}
                          onClick={() => manualAllocate(s._id, choice[s._id])}
                          className={`px-3 py-1 rounded-md text-sm text-white transition ${choice[s._id] ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"}`}
                        >
                          Allocate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* Awaiting acceptance */}
          {pendingAwaitingAcceptance.length > 0 && (
            <>
              <p className="mb-2 font-medium text-gray-700">Allocated but awaiting student acceptance</p>
              <table className="w-full border rounded-md overflow-hidden">
                <thead className="bg-purple-100 text-purple-800">
                  <tr>
                    <th className="py-2 border">Name</th>
                    <th className="py-2 border">Marks</th>
                    <th className="py-2 border">Allocated Branch</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingAwaitingAcceptance.map(s => (
                    <tr key={s._id} className="text-center hover:bg-gray-50 transition">
                      <td className="py-2 border">{s.name}</td>
                      <td className="py-2 border">{s.total}</td>
                      <td className="py-2 border font-semibold">{s.allocatedBranch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {pendingUnallocated.length === 0 && pendingAwaitingAcceptance.length === 0 && (
            <p className="text-gray-500">No pending applications</p>
          )}
        </div>

        {/* ACCEPTED SECTION */}
        <div ref={acceptedRef} className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
          <h3 className="text-lg font-bold mb-3 text-green-700">Accepted Students</h3>
          {acceptedStudents.length > 0 ? (
            <table className="w-full border rounded-md overflow-hidden">
              <thead className="bg-green-100 text-green-800">
                <tr>
                  <th className="py-2 border">Name</th>
                  <th className="py-2 border">Marks</th>
                  <th className="py-2 border">Branch</th>
                </tr>
              </thead>
              <tbody>
                {acceptedStudents.map(s => (
                  <tr key={s._id} className="text-center hover:bg-gray-50 transition">
                    <td className="py-2 border">{s.name}</td>
                    <td className="py-2 border">{s.total}</td>
                    <td className="py-2 border font-semibold">{s.allocatedBranch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">None accepted yet</p>
          )}
        </div>

        {/* REJECTED SECTION */}
        <div ref={rejectedRef} className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
          <h3 className="text-lg font-bold mb-3 text-red-700">Rejected Students</h3>
          {rejectedStudents.length > 0 ? (
            <table className="w-full border rounded-md overflow-hidden">
              <thead className="bg-red-100 text-red-800">
                <tr>
                  <th className="py-2 border">Name</th>
                  <th className="py-2 border">Marks</th>
                  <th className="py-2 border">Reason</th>
                </tr>
              </thead>
              <tbody>
                {rejectedStudents.map(s => (
                  <tr key={s._id} className="text-center hover:bg-gray-50 transition">
                    <td className="py-2 border">{s.name}</td>
                    <td className="py-2 border">{s.total}</td>
                    <td className="py-2 border text-sm">Not allocated / Rejected by student</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">None rejected</p>
          )}
        </div>

        {/* POPUP FOR NEW ALLOCATIONS */}
        {newAlloc.length > 0 && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 space-y-4">
              <h2 className="text-lg font-semibold">New Allocations</h2>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {newAlloc.map(a => (
                  <li key={a.id} className="text-gray-800 text-sm">
                    {a.name} → <span className="font-semibold">{a.branch}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setNewAlloc([])}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
