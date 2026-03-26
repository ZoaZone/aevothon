import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import Home              from './pages/Home';
import Login             from './pages/Login';
import Pricing           from './pages/Pricing';
import Dashboard         from './pages/Dashboard';
import WebChatbot        from './pages/WebChatbot';
import HelpGuide         from './pages/HelpGuide';
import PostPaymentOnboarding from './pages/PostPaymentOnboarding';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
});

function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("base44_access_token");
  if (!token) return <Navigate to="/Home" state={{ from: location.pathname }} replace />;
  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/"         element={<Home />} />
          <Route path="/Home"     element={<Home />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/Pricing"  element={<Pricing />} />
          <Route path="/PostPaymentOnboarding" element={<PostPaymentOnboarding />} />

          {/* Protected */}
          <Route path="/Dashboard"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/WebChatbot" element={<ProtectedRoute><WebChatbot /></ProtectedRoute>} />
          <Route path="/HelpGuide"  element={<ProtectedRoute><HelpGuide /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
