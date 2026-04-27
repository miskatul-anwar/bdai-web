import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Background from './pages/about/Background';
import BdaiVideos from './pages/about/BdaiVideos';
import Impact from './pages/about/Impact';
import Objectives from './pages/about/Objectives';
import OnePager from './pages/about/OnePager';
import { WP1, WP2, WP3 } from './pages/work-packages/WorkPackages';
import Consortium from './pages/Consortium';
import SparqlTool from './pages/SparqlTool';
import Publications from './pages/results/Publications';
import Reports from './pages/results/Reports';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about">
            <Route index element={<Navigate to="background" replace />} />
            <Route path="background" element={<Background />} />
            <Route path="bdai-videos" element={<BdaiVideos />} />
            <Route path="impact" element={<Impact />} />
            <Route path="objectives" element={<Objectives />} />
            <Route path="onepager" element={<OnePager />} />
          </Route>
          <Route path="work-packages">
            <Route index element={<Navigate to="wp1" replace />} />
            <Route path="wp1" element={<WP1 />} />
            <Route path="wp2" element={<WP2 />} />
            <Route path="wp3" element={<WP3 />} />
          </Route>
          <Route path="consortium" element={<Consortium />} />
          <Route path="sparql-tool" element={<SparqlTool />} />
          <Route path="results">
            <Route index element={<Navigate to="publications" replace />} />
            <Route path="publications" element={<Publications />} />
            <Route path="reports" element={<Reports />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
