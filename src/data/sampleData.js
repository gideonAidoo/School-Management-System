// src/data/sampleData.js
export const sampleData = {
  students: [
    {
      id: 'S001',
      name: 'John Smith',
      grade: 'Grade 10',
      section: 'A',
      email: 'john.smith@school.edu'
    },
    {
      id: 'S002',
      name: 'Emma Johnson',
      grade: 'Grade 10',
      section: 'A',
      email: 'emma.johnson@school.edu'
    },
    {
      id: 'S003',
      name: 'Michael Brown',
      grade: 'Grade 10',
      section: 'B',
      email: 'michael.brown@school.edu'
    },
    {
      id: 'S004',
      name: 'Sarah Davis',
      grade: 'Grade 9',
      section: 'A',
      email: 'sarah.davis@school.edu'
    },
    {
      id: 'S005',
      name: 'David Wilson',
      grade: 'Grade 9',
      section: 'B',
      email: 'david.wilson@school.edu'
    },
    {
      id: 'S006',
      name: 'Lisa Anderson',
      grade: 'Grade 10',
      section: 'B',
      email: 'lisa.anderson@school.edu'
    },
    {
      id: 'S007',
      name: 'James Miller',
      grade: 'Grade 9',
      section: 'A',
      email: 'james.miller@school.edu'
    }
  ],
  
  subjects: [
    { id: 'MATH', name: 'Mathematics', grade: 'Grade 10' },
    { id: 'ENG', name: 'English', grade: 'Grade 10' },
    { id: 'SCI', name: 'Science', grade: 'Grade 10' },
    { id: 'SOC', name: 'Social Studies', grade: 'Grade 10' },
    { id: 'MATH9', name: 'Mathematics', grade: 'Grade 9' },
    { id: 'ENG9', name: 'English', grade: 'Grade 9' },
    { id: 'SCI9', name: 'Science', grade: 'Grade 9' },
    { id: 'SOC9', name: 'Social Studies', grade: 'Grade 9' }
  ],
  
  examResults: [
    // Grade 10 - Section A
    { studentId: 'S001', subjectId: 'MATH', subjectName: 'Mathematics', marks: 85, totalMarks: 100, grade: 'A' },
    { studentId: 'S001', subjectId: 'ENG', subjectName: 'English', marks: 78, totalMarks: 100, grade: 'B' },
    { studentId: 'S001', subjectId: 'SCI', subjectName: 'Science', marks: 92, totalMarks: 100, grade: 'A+' },
    { studentId: 'S001', subjectId: 'SOC', subjectName: 'Social Studies', marks: 88, totalMarks: 100, grade: 'A' },
    
    { studentId: 'S002', subjectId: 'MATH', subjectName: 'Mathematics', marks: 95, totalMarks: 100, grade: 'A+' },
    { studentId: 'S002', subjectId: 'ENG', subjectName: 'English', marks: 89, totalMarks: 100, grade: 'A' },
    { studentId: 'S002', subjectId: 'SCI', subjectName: 'Science', marks: 91, totalMarks: 100, grade: 'A+' },
    { studentId: 'S002', subjectId: 'SOC', subjectName: 'Social Studies', marks: 87, totalMarks: 100, grade: 'A' },

    // Grade 10 - Section B
    { studentId: 'S003', subjectId: 'MATH', subjectName: 'Mathematics', marks: 72, totalMarks: 100, grade: 'B' },
    { studentId: 'S003', subjectId: 'ENG', subjectName: 'English', marks: 68, totalMarks: 100, grade: 'C' },
    { studentId: 'S003', subjectId: 'SCI', subjectName: 'Science', marks: 75, totalMarks: 100, grade: 'B' },
    { studentId: 'S003', subjectId: 'SOC', subjectName: 'Social Studies', marks: 79, totalMarks: 100, grade: 'B' },

    { studentId: 'S006', subjectId: 'MATH', subjectName: 'Mathematics', marks: 88, totalMarks: 100, grade: 'A' },
    { studentId: 'S006', subjectId: 'ENG', subjectName: 'English', marks: 82, totalMarks: 100, grade: 'A' },
    { studentId: 'S006', subjectId: 'SCI', subjectName: 'Science', marks: 85, totalMarks: 100, grade: 'A' },
    { studentId: 'S006', subjectId: 'SOC', subjectName: 'Social Studies', marks: 80, totalMarks: 100, grade: 'A' },
    
    // Grade 9 - Section A
    { studentId: 'S004', subjectId: 'MATH9', subjectName: 'Mathematics', marks: 82, totalMarks: 100, grade: 'A' },
    { studentId: 'S004', subjectId: 'ENG9', subjectName: 'English', marks: 76, totalMarks: 100, grade: 'B' },
    { studentId: 'S004', subjectId: 'SCI9', subjectName: 'Science', marks: 85, totalMarks: 100, grade: 'A' },
    { studentId: 'S004', subjectId: 'SOC9', subjectName: 'Social Studies', marks: 79, totalMarks: 100, grade: 'B' },

    { studentId: 'S007', subjectId: 'MATH9', subjectName: 'Mathematics', marks: 65, totalMarks: 100, grade: 'C' },
    { studentId: 'S007', subjectId: 'ENG9', subjectName: 'English', marks: 71, totalMarks: 100, grade: 'B' },
    { studentId: 'S007', subjectId: 'SCI9', subjectName: 'Science', marks: 68, totalMarks: 100, grade: 'C' },
    { studentId: 'S007', subjectId: 'SOC9', subjectName: 'Social Studies', marks: 74, totalMarks: 100, grade: 'B' },
    
    // Grade 9 - Section B
    { studentId: 'S005', subjectId: 'MATH9', subjectName: 'Mathematics', marks: 91, totalMarks: 100, grade: 'A+' },
    { studentId: 'S005', subjectId: 'ENG9', subjectName: 'English', marks: 84, totalMarks: 100, grade: 'A' },
    { studentId: 'S005', subjectId: 'SCI9', subjectName: 'Science', marks: 89, totalMarks: 100, grade: 'A' },
    { studentId: 'S005', subjectId: 'SOC9', subjectName: 'Social Studies', marks: 86, totalMarks: 100, grade: 'A' }
  ]
};