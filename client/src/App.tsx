import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import SocialMediaButton from "@/components/SocialMediaButton"; 
import RightFloatingButtons from  "@/components/RightFloatingButtons";
// Import the Social Media Component
import Footer from "@/components/footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
      <SocialMediaButton /> 
      <RightFloatingButtons />
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
