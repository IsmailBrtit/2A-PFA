import api from './mockApi';

let semestersMock = [
  {
    id: 1,
    label: "S1",
    type: "NORMAL",
    academic_year_id: 1
  },
  {
    id: 2,
    label: "PFE",
    type: "PFE",
    academic_year_id: 1
  },
  {
    id: 3,
    label: "S2",
    type: "NORMAL",
    academic_year_id: 2
  }
];

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const semesterService = {
  getAll: async () => {
    await delay(300);
    return semestersMock;
  },

  getById: async (id) => {
    await delay(200);
    return semestersMock.find(s => s.id === id) || null;
  },

  getByAcademicYearId: async (academicYearId) => {
    await delay(300);
    return semestersMock.filter(s => s.academic_year_id === academicYearId);
  },

  create: async (semester) => {
    await delay(300);
    const newSemester = { ...semester, id: semestersMock.length + 1 };
    semestersMock.push(newSemester);
    return newSemester;
  },

  update: async (id, semester) => {
    await delay(300);
    semestersMock = semestersMock.map(s => s.id === id ? { ...s, ...semester } : s);
    return semestersMock.find(s => s.id === id);
  },

  delete: async (id) => {
    await delay(200);
    semestersMock = semestersMock.filter(s => s.id !== id);
    return true;
  }
};
