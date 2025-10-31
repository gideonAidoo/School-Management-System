// src/pages/Students.jsx
import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import { Search, Plus, Edit, Trash2, User, Mail, Filter } from 'lucide-react';

const Students = () => {
  const { students, examResults } = useExam();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  // Get unique grades and sections for filters
  const grades = [...new Set(students.map(s => s.grade))];
  const sections = [...new Set(students.map(s => s.section))];

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = !selectedGrade || student.grade === selectedGrade;
    const matchesSection = !selectedSection || student.section === selectedSection;
    
    return matchesSearch && matchesGrade && matchesSection;
  });

  // Calculate student average
  const getStudentAverage = (studentId) => {
    const studentResults = examResults.filter(r => r.studentId === studentId);
    if (!studentResults.length) return 0;
    return studentResults.reduce((sum, r) => sum + r.marks, 0) / studentResults.length;
  };

  // Get number of subjects for a student
  const getSubjectCount = (studentId) => {
    return examResults.filter(r => r.studentId === studentId).length;
  };

  // Handle adding a new student (placeholder function)
  const handleAddStudent = () => {
    alert('Add Student functionality would open a form here');
    // In a real app, this would open a modal or form
  };

  // Handle editing a student (placeholder function)
  const handleEditStudent = (student) => {
    alert(`Edit student: ${student.name}`);
    // In a real app, this would open an edit form
  };

  // Handle deleting a student (placeholder function)
  const handleDeleteStudent = (student) => {
    if (confirm(`Are you sure you want to delete ${student.name}?`)) {
      alert(`Student ${student.name} would be deleted`);
      // In a real app, this would dispatch an action to remove the student
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600">Manage student information and records</p>
        </div>
        <button 
          onClick={handleAddStudent}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Students
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Grade Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grade
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Grades</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          {/* Section Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Sections</option>
              {sections.map(section => (
                <option key={section} value={section}>Section {section}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-blue-900">
              {filteredStudents.length} students found
            </p>
            <p className="text-sm text-blue-700">
              {selectedGrade && `Grade: ${selectedGrade} • `}
              {selectedSection && `Section: ${selectedSection} • `}
              {searchTerm && `Search: "${searchTerm}"`}
            </p>
          </div>
          {(selectedGrade || selectedSection || searchTerm) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGrade('');
                setSelectedSection('');
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade & Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Academic Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => {
                const average = getStudentAverage(student.id);
                const subjectCount = getSubjectCount(student.id);
                const hasResults = subjectCount > 0;
                
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    {/* Student Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {student.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Contact */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-4 w-4 mr-2" />
                        {student.email}
                      </div>
                    </td>
                    
                    {/* Grade & Section */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.grade}</div>
                      <div className="text-sm text-gray-500">Section {student.section}</div>
                    </td>
                    
                    {/* Academic Performance */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {hasResults ? `${average.toFixed(1)}%` : 'No data'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {hasResults ? `${subjectCount} subjects` : 'Not evaluated'}
                      </div>
                      {hasResults && (
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${average}%` }}
                          ></div>
                        </div>
                      )}
                    </td>
                    
                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        hasResults
                          ? average >= 80 
                            ? 'bg-green-100 text-green-800'
                            : average >= 60
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {hasResults
                          ? average >= 80 ? 'Excellent'
                            : average >= 60 ? 'Average'
                            : 'Needs Help'
                          : 'No Data'
                        }
                      </span>
                    </td>
                    
                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="text-primary-600 hover:text-primary-900 p-1 rounded hover:bg-primary-50 transition-colors"
                          title="Edit Student"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Delete Student"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedGrade || selectedSection 
                ? 'Try adjusting your search or filter criteria.'
                : 'No students in the system yet.'
              }
            </p>
            {!searchTerm && !selectedGrade && !selectedSection && (
              <button
                onClick={handleAddStudent}
                className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Add First Student
              </button>
            )}
          </div>
        )}
      </div>

      {/* Summary Footer */}
      {filteredStudents.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Showing {filteredStudents.length} of {students.length} students</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;