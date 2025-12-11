import ReactDOM from 'react-dom/client';
import { BrowserRouter }    from 'react-router-dom';
import App                  from './App';

import { StudentAuthProvider } from '@/context/StudentAuth';
import { AdminAuthProvider }   from '@/context/AdminAuth';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>                {/* ← Router wrapper */}
    <AdminAuthProvider>
      <StudentAuthProvider>
        <App />                  {/* ← App renders AppRoutes */}
      </StudentAuthProvider>
    </AdminAuthProvider>
  </BrowserRouter>
);
