import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import { Switch, Route } from "wouter";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import SocialMediaButton from "./components/SocialMediaButton";
import RightFloatingButtons from "./components/RightFloatingButtons";
import Footer from "./components/footer";
import { ThemeToggle } from "./components/theme-toggle"; // Move here!

function Router() {
  return (
    <Switch>
      <Route path="/mainpage" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeToggle /> {/* Now it applies globally */}
      <Router />
      <Toaster />
      <SocialMediaButton />
      <RightFloatingButtons />
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
