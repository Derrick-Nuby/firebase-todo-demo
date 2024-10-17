import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodoPage } from "./pages/TodoPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoPage />
    </QueryClientProvider>
  );
}

export default App;