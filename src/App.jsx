
import React from 'react';
import Layout from './components/Layout/Layout';
import { ExamProvider } from './context/ExamContext';
import './styles/global.css';

function App() {
  return (
    <ExamProvider>
      <Layout />
    </ExamProvider>
  );
}

export default App;