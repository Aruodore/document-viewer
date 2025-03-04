import { Route, Routes } from "react-router";
import {Dashboard} from "./pages/dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DefaultLayout } from "./layouts/default";
import { UserProfile } from "./pages/user-profile";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
