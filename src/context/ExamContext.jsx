import React, { createContext, useContext, useReducer } from 'react';
import { sampleData } from '../data/sampleData';

const ExamContext = createContext();

const initialState = {
  students: sampleData.students,
  subjects: sampleData.subjects,
  examResults: sampleData.examResults,
  currentTerm: 'First Term',
  academicYear: '2024'
};

function examReducer(state, action) {
  switch (action.type) {
    case 'ADD_STUDENT':
      return {
        ...state,
        students: [...state.students, action.payload]
      };
    case 'UPDATE_RESULTS':
      return {
        ...state,
        examResults: action.payload
      };
    case 'SET_TERM':
      return {
        ...state,
        currentTerm: action.payload
      };
    default:
      return state;
  }
}

export function ExamProvider({ children }) {
  const [state, dispatch] = useReducer(examReducer, initialState);

  const calculateGrade = (marks) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 50) return 'D';
    return 'F';
  };

  const getStudentResults = (studentId) => {
    return state.examResults.filter(result => result.studentId === studentId);
  };

  const generateTermReport = (studentId) => {
    const student = state.students.find(s => s.id === studentId);
    if (!student) return null;

    const studentResults = getStudentResults(studentId);
    
    const totalObtained = studentResults.reduce((sum, result) => sum + result.marks, 0);
    const totalMax = studentResults.reduce((sum, result) => sum + result.totalMarks, 0);
    const average = studentResults.length ? totalObtained / studentResults.length : 0;
    
    return {
      student,
      term: state.currentTerm,
      academicYear: state.academicYear,
      results: studentResults,
      totalMarks: totalObtained,
      average: average,
      overallGrade: calculateGrade(average)
    };
  };

  const value = {
    ...state,
    dispatch,
    calculateGrade,
    getStudentResults,
    generateTermReport
  };

  return (
    <ExamContext.Provider value={value}>
      {children}
    </ExamContext.Provider>
  );
}

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};