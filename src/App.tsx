// src/App.tsx
import { useAuth } from "./hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodoPage } from "./pages/TodoPage";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  const { user } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {user ? (
          // Container for logged-in users
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
            <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
              Welcome, {user.email}!
            </h1>
            <Logout />
            <TodoPage />
          </div>
        ) : (
          // Container for login page
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Please Log In
            </h2>
            <Login />
          </div>
        )}
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
