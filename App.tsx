
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import PostDetail from './pages/PostDetail';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<PostDetail type="project" />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<PostDetail type="blog" />} />
        <Route path="*" element={<div className="text-center py-20"><h1 className="text-6xl font-black">404 - LOST IN THE LATENT SPACE</h1></div>} />
      </Routes>
    </Layout>
  );
};

export default App;
