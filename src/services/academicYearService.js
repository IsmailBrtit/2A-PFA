import api from './mockApi';

let academicYearsMock = [
  {
    id: 1,
    yearLabel: "2023-2024",
    mobility_id: 1
  },
  {
    id: 2,
    yearLabel: "2024-2025",
    mobility_id: 1
  }
];

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const academicYearService = {
  getAll: async () => {
    await delay(300);
    return academicYearsMock;
  },

  getById: async (id) => {
    await delay(200);
    return academicYearsMock.find(y => y.id === id) || null;
  },

  create: async (year) => {
    await delay(300);
    const newYear = { ...year, id: academicYearsMock.length + 1 };
    academicYearsMock.push(newYear);
    return newYear;
  },

  update: async (id, year) => {
    await delay(300);
    academicYearsMock = academicYearsMock.map(y => y.id === id ? { ...y, ...year } : y);
    return academicYearsMock.find(y => y.id === id);
  },

  delete: async (id) => {
    await delay(200);
    academicYearsMock = academicYearsMock.filter(y => y.id !== id);
    return true;
  }
};
