import React from 'react';
import { useExam } from '../context/ExamContext';
import { 
  Users, 
  FileText, 
  Award, 
  TrendingUp,
  School
} from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue' }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-lg bg-${color}-50`}>
        <Icon className={`h-6 w-6 text-${color}-600`} />
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { students, examResults, currentTerm, academicYear } = useExam();

  const totalStudents = students.length;
  const totalSubjects = [...new Set(examResults.map(r => r.subjectId))].length;
  
  // Calculate averages for all students
  const studentAverages = students.map(student => {
    const studentResults = examResults.filter(r => r.studentId === student.id);
    const average = studentResults.length 
      ? studentResults.reduce((sum, r) => sum + r.marks, 0) / studentResults.length 
      : 0;
    return average;
  });
  
  const overallAverage = studentAverages.length 
    ? studentAverages.reduce((sum, avg) => sum + avg, 0) / studentAverages.length 
    : 0;

  const topPerformers = students.map(student => {
    const studentResults = examResults.filter(r => r.studentId === student.id);
    const average = studentResults.length 
      ? studentResults.reduce((sum, r) => sum + r.marks, 0) / studentResults.length 
      : 0;
    return { ...student, average };
  }).sort((a, b) => b.average - a.average).slice(0, 5);

  const recentActivities = [
    { action: 'Report cards generated', time: '2 hours ago', type: 'success' },
    { action: 'New student added', time: '5 hours ago', type: 'info' },
    { action: 'Exam results updated', time: '1 day ago', type: 'success' },
    { action: 'System maintenance', time: '2 days ago', type: 'warning' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">End of Term Examination System Overview</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">{currentTerm}</p>
          <p className="text-gray-600">Academic Year: {academicYear}</p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Students"
          value={totalStudents}
          subtitle="Active students"
          color="blue"
        />
        <StatCard
          icon={FileText}
          title="Subjects"
          value={totalSubjects}
          subtitle="Across all grades"
          color="green"
        />
        <StatCard
          icon={TrendingUp}
          title="Average Score"
          value={overallAverage.toFixed(1)}
          subtitle="Class average"
          color="purple"
        />
        <StatCard
          icon={Award}
          title="Top Performer"
          value={topPerformers[0]?.average.toFixed(1) || '0.0'}
          subtitle={topPerformers[0]?.name || 'N/A'}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-3">
            {topPerformers.map((student, index) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                    index === 1 ? 'bg-gray-100 text-gray-700' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.grade} - Section {student.section}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{student.average.toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">Average</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors text-left">
            <FileText className="h-6 w-6 text-primary-600 mb-2" />
            <h4 className="font-semibold text-gray-900">Generate Reports</h4>
            <p className="text-sm text-gray-600">Create report cards</p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors text-left">
            <Users className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-semibold text-gray-900">Manage Students</h4>
            <p className="text-sm text-gray-600">Add or edit students</p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors text-left">
            <Award className="h-6 w-6 text-purple-600 mb-2" />
            <h4 className="font-semibold text-gray-900">View Rankings</h4>
            <p className="text-sm text-gray-600">Student performance</p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors text-left">
            <School className="h-6 w-6 text-orange-600 mb-2" />
            <h4 className="font-semibold text-gray-900">System Settings</h4>
            <p className="text-sm text-gray-600">Configure system</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;