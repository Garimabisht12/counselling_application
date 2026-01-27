import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStuApi } from '@/api/studentApi';
import Navbar from '@/components/Navbar/Navbar';
import { useStudentAuth } from '@/context/StudentAuth';
import { ArrowLeft } from 'lucide-react';

export default function AdmissionForm() {
  const api = useStuApi();
  const nav = useNavigate();

  const { student: cached } = useStudentAuth();
  const [profile] = useState(cached);

  const [marks, setMarks] = useState({ physics: '', chemistry: '', maths: '' });

  const [branches, setBranches] = useState([]);
  const [prefs, setPrefs] = useState([]);

  // Fetch branches
  const loadBranches = async () => {
    const { data } = await api.get('/student/branches');
    setBranches(data);
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const togglePreference = (branchCode) => {
    if (prefs.includes(branchCode)) {
      setPrefs(prefs.filter((b) => b !== branchCode));
    } else {
      setPrefs([...prefs, branchCode]);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.put('/student/marks', marks);
      await api.put('/student/preferences', { preferences: prefs });
      nav('/dashboard');
    } catch (err) {
      console.error('Submit failed:', err);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <>
      <Navbar />

      {/* Back Button */}
      <div className="max-w-lg mx-auto mt-6">
        <button
          onClick={() => nav(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      {/* Form */}
      <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-xl space-y-6">
        <h1 className="text-2xl font-semibold text-center">Admission Form</h1>

        <form onSubmit={submit} className="space-y-4">

          {/* Read-only info */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              value={profile.name}
              readOnly
              className="border p-2 w-full bg-gray-100 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              value={profile.email}
              readOnly
              className="border p-2 w-full bg-gray-100 rounded"
            />
          </div>

          {/* Marks */}
          <h2 className="text-lg font-semibold mt-4">Enter Marks</h2>

          {['physics', 'chemistry', 'maths'].map((m) => (
            <div key={m}>
              <label className="block mb-1 font-medium capitalize">{m} Marks</label>
              <input
                required
                type="number"
                min="0"
                max="100"
                value={marks[m]}
                onChange={(e) => setMarks({ ...marks, [m]: e.target.value })}
                placeholder={`Enter ${m} marks`}
                className="border p-2 w-full rounded"
              />
            </div>
          ))}

          {/* Preferences Dropdown */}
          <div>
            <label className="block mb-1 font-medium">Select Branch Preferences</label>

            <div className="border rounded p-2 max-h-48 overflow-y-auto">
              {branches.map((b) => (
                <label
                  key={b.code}
                  className="flex items-center gap-3 py-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={prefs.includes(b.code)}
                    onChange={() => togglePreference(b.code)}
                  />
                  <span>{b.code}</span>
                </label>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Select in the order you want (top = highest priority)
            </p>
          </div>

          {/* Submit Button */}
          <button className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-lg text-lg">
            Submit Form
          </button>
        </form>

        <div className="text-center">
          <a href="/home" className="text-blue-600 hover:underline text-sm">
            Go to Home
          </a>
        </div>
      </div>
    </>
  );
}
