import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClientInstance } from "@/lib/query-client";

import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/toaster";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Accommodation from "@/pages/Accommodation";
import Conference from "@/pages/Conference";
import Retreats from "@/pages/Retreats";
import TeamBuilding from "@/pages/TeamBuilding";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";

import PageNotFound from "./lib/PageNotFound";

export default function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/conference" element={<Conference />} />
            <Route path="/retreats" element={<Retreats />} />
            <Route path="/team-building" element={<TeamBuilding />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}