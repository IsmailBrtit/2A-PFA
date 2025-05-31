import mockApi from './mockApi';

// Mock data initiale (exemple simple)
let mobilitiesMock = [
  {
    id: 1,
    program: 'Erasmus+ 2024',
    startDate: '2024-09-01',
    endDate: '2025-06-30',
    type: 'EXCHANGE',
    status: 'PENDING',
    studentId: 1,
  },
  {
    id: 2,
    program: 'Stage International',
    startDate: '2024-07-01',
    endDate: '2024-09-01',
    type: 'INTERNSHIP',
    status: 'APPROVED',
    studentId: 2,
  },
];

// Simule délai
const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const fetchMobilities = async () => {
  await delay(300);
  return mobilitiesMock;
};

export const fetchMobilityById = async (id) => {
  await delay(200);
  return mobilitiesMock.find(m => m.id === id) || null;
};

export const createMobility = async (mobilityData) => {
  await delay(300);
  const newId = mobilitiesMock.length === 0 ? 1 : Math.max(...mobilitiesMock.map(m => m.id)) + 1;
  const newMobility = { ...mobilityData, id: newId };
  mobilitiesMock.push(newMobility);
  return newMobility;
};

export const updateMobility = async (id, mobilityData) => {
  await delay(300);
  mobilitiesMock = mobilitiesMock.map(m => (m.id === id ? { ...m, ...mobilityData } : m));
  return mobilitiesMock.find(m => m.id === id);
};

export const deleteMobility = async (id) => {
  await delay(200);
  mobilitiesMock = mobilitiesMock.filter(m => m.id !== id);
  return true;
};
