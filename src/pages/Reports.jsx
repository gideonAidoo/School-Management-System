import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import { Search, Download, Printer, Eye, User } from 'lucide-react';

const Reports = () => {
  const { students, generateTermReport } = useExam();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreview = (studentId) => {
    setSelectedStudent(studentId);
    setShowPreview(true);
  };

  const handlePrint = (studentId) => {
    const report = generateTermReport(studentId);
    console.log('Printing report for:', report?.student?.name);
    alert(`Printing report card for ${report?.student?.name}`);
    // Implement actual PDF generation and printing here
  };

  const handleDownload = (studentId) => {
    const report = generateTermReport(studentId);
    console.log('Downloading report for:', report?.student?.name);
    alert(`Downloading report card for ${report?.student?.name}`);
    // Implement actual PDF download here
  };

  const ReportPreview = ({ studentId }) => {
    const report = generateTermReport(studentId);
    
    if (!report) return <div>No report data found</div>;

    return (
      <div className="bg-white border-2 border-gray-300 p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">BRIGHT FUTURE ACADEMY</h1>
          <p className="text-lg text-gray-700 mb-1">End of Term Report Card</p>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Term: {report.term}</span>
            <span>Academic Year: {report.academicYear}</span>
          </div>
        </div>

        {/* Student Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <p><strong>Student ID:</strong> {report.student.id}</p>
            <p><strong>Name:</strong> {report.student.name.toUpperCase()}</p>
          </div>
          <div>
            <p><strong>Grade:</strong> {report.student.grade}</p>
            <p><strong>Section:</strong> {report.student.section}</p>
          </div>
        </div>

        {/* Results Table */}
        <table className="w-full mb-6 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Marks Obtained</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Total Marks</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Grade</th>
            </tr>
          </thead>
          <tbody>
            {report.results.map((result, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-gray-300 px-4 py-2">{result.subjectName}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{result.marks}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{result.totalMarks}</td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">{result.grade}</td>
              </tr>
            ))}
            {/* Summary Row */}
            <tr className="bg-gray-100 font-semibold">
              <td className="border border-gray-300 px-4 py-2">TOTAL</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{report.totalMarks}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {report.results.reduce((sum, r) => sum + r.totalMarks, 0)}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">{report.overallGrade}</td>
            </tr>
          </tbody>
        </table>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Academic Summary</h3>
            <p><strong>Average Percentage:</strong> {report.average.toFixed(2)}%</p>
            <p><strong>Overall Grade:</strong> {report.overallGrade}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold mb-2">Remarks</h3>
            <p>{report.average >= 60 ? 'Excellent performance! Keep up the good work.' : 'Needs improvement. Please focus on studies.'}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-300">
          <div className="text-center">
            <p className="font-semibold">Class Teacher</p>
            <p className="text-sm text-gray-600">Signature</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Principal</p>
            <p className="text-sm text-gray-600">Signature</p>
          </div>
        </div>

        <div className="text-center mt-4 text-sm text-gray-500">
          Generated on: {new Date().toLocaleDateString()}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Report Cards</h1>
        <p className="text-gray-600">Generate and print end-of-term report cards</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade & Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average
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
                const report = generateTermReport(student.id);
                const average = report?.average || 0;
                
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.id}</div>
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Ready
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePreview(student.id)}
                          className="flex items-center space-x-1 text-primary-600 hover:text-primary-900"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Preview</span>
                        </button>
                        <button
                          onClick={() => handlePrint(student.id)}
                          className="flex items-center space-x-1 text-green-600 hover:text-green-900"
                        >
                          <Printer className="h-4 w-4" />
                          <span>Print</span>
                        </button>
                        <button 
                          onClick={() => handleDownload(student.id)}
                          className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                        >
                          <Download className="h-4 w-4" />
                          <span>PDF</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Report Card Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <ReportPreview studentId={selectedStudent} />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => handlePrint(selectedStudent)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  Print Report
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;