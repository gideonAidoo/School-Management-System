import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import { Printer, Download, Filter, Users, Check, CheckCircle } from 'lucide-react';

const BulkPrint = () => {
  const { students, generateTermReport } = useExam();
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedStudents, setSelectedStudents] = useState(new Set());
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const grades = [...new Set(students.map(s => s.grade))];
  const sections = [...new Set(students.map(s => s.section))];

  const filteredStudents = students.filter(student => {
    const matchesGrade = !selectedGrade || student.grade === selectedGrade;
    const matchesSection = !selectedSection || student.section === selectedSection;
    return matchesGrade && matchesSection;
  });

  const toggleStudentSelection = (studentId) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      newSelected.add(studentId);
    }
    setSelectedStudents(newSelected);
  };

  const selectAll = () => {
    if (selectedStudents.size === filteredStudents.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(filteredStudents.map(s => s.id)));
    }
  };

  const handleBulkPrint = async () => {
    if (selectedStudents.size === 0) return;
    
    setIsPrinting(true);
    const studentsToPrint = filteredStudents.filter(student => 
      selectedStudents.has(student.id)
    );
    
    // Simulate printing process
    for (const student of studentsToPrint) {
      const report = generateTermReport(student.id);
      console.log('Printing report for:', student.name, report);
      // In a real app, you would generate PDF here
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    }
    
    setIsPrinting(false);
    alert(`Successfully printed ${studentsToPrint.length} report cards!`);
  };

  const handleBulkDownload = async () => {
    if (selectedStudents.size === 0) return;
    
    setIsDownloading(true);
    const studentsToDownload = filteredStudents.filter(student => 
      selectedStudents.has(student.id)
    );
    
    // Simulate download process
    for (const student of studentsToDownload) {
      const report = generateTermReport(student.id);
      console.log('Downloading report for:', student.name, report);
      // In a real app, you would generate and download PDF here
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
    }
    
    setIsDownloading(false);
    alert(`Successfully downloaded ${studentsToDownload.length} report cards!`);
  };

  const getStudentAverage = (studentId) => {
    const studentResults = students.find(s => s.id === studentId)?.results || [];
    if (!studentResults.length) return 0;
    return studentResults.reduce((sum, r) => sum + r.marks, 0) / studentResults.length;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bulk Print</h1>
          <p className="text-gray-600">Generate report cards for multiple students at once</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleBulkDownload}
            disabled={selectedStudents.size === 0 || isDownloading}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <Download className="h-5 w-5" />
            <span>
              {isDownloading ? 'Downloading...' : `Download (${selectedStudents.size})`}
            </span>
          </button>
          <button
            onClick={handleBulkPrint}
            disabled={selectedStudents.size === 0 || isPrinting}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <Printer className="h-5 w-5" />
            <span>
              {isPrinting ? 'Printing...' : `Print (${selectedStudents.size})`}
            </span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
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
          <div className="flex-1">
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

      {/* Selection Summary */}
      {selectedStudents.size > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600" />
              <div>
                <p className="font-semibold text-primary-900">
                  {selectedStudents.size} students selected
                </p>
                <p className="text-sm text-primary-700">
                  Ready for bulk operations
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedStudents(new Set())}
              className="text-primary-600 hover:text-primary-800 text-sm font-medium"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Students List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-gray-600" />
            <span className="font-semibold">
              {filteredStudents.length} Students Found
            </span>
            {selectedStudents.size > 0 && (
              <span className="text-sm text-gray-600">
                ({selectedStudents.size} selected)
              </span>
            )}
          </div>
          <button
            onClick={selectAll}
            className="text-primary-600 hover:text-primary-800 font-medium text-sm"
          >
            {selectedStudents.size === filteredStudents.length && filteredStudents.length > 0 
              ? 'Deselect All' 
              : 'Select All'
            }
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  Select
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade & Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => {
                const average = getStudentAverage(student.id);
                const isSelected = selectedStudents.has(student.id);
                
                return (
                  <tr 
                    key={student.id} 
                    className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleStudentSelection(student.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.grade}</div>
                      <div className="text-sm text-gray-500">Section {student.section}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {average > 0 ? `${average.toFixed(1)}%` : 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.results?.length || 0} subjects
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        average >= 60 
                          ? 'bg-green-100 text-green-800' 
                          : average > 0 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {average >= 60 ? 'Excellent' : average > 0 ? 'Average' : 'No Data'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Bulk Actions Footer - Sticky */}
      {selectedStudents.size > 0 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-semibold text-gray-900">
                  {selectedStudents.size} students selected for processing
                </p>
                <p className="text-sm text-gray-600">
                  Choose an action below
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleBulkDownload}
                disabled={isDownloading}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>{isDownloading ? 'Downloading...' : 'Download PDFs'}</span>
              </button>
              <button
                onClick={handleBulkPrint}
                disabled={isPrinting}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 transition-colors"
              >
                <Printer className="h-4 w-4" />
                <span>{isPrinting ? 'Printing...' : 'Print All'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {(isPrinting || isDownloading) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
              <div>
                <p className="font-semibold text-gray-900">
                  {isPrinting ? 'Printing Reports...' : 'Downloading Reports...'}
                </p>
                <p className="text-sm text-gray-600">
                  Please wait while we process {selectedStudents.size} report cards
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkPrint;