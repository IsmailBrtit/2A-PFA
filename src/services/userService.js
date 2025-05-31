import mockApi from './mockApi';

// Mock données utilisateurs
let usersMock = [
  {
    id: 1,
    fullName: 'Alice Dupont',
    email: 'alice@example.com',
    role: 'STUDENT',
    filiere: 'CS',
  },
  {
    id: 2,
    fullName: 'Bob Martin',
    email: 'bob@example.com',
    role: 'PARTNER',
    universityName: 'Université Paris-Saclay',
    country: 'France',
    gradingScale: '20 points',
  },
];

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const fetchUsers = async () => {
  await delay(300);
  return usersMock;
};

export const fetchUserById = async (id) => {
  await delay(200);
  return usersMock.find(u => u.id === id) || null;
};

export const createUser = async (userData) => {
  await delay(300);
  const newUser = { ...userData, id: usersMock.length + 1 };
  usersMock.push(newUser);
  return newUser;
};

export const updateUser = async (id, userData) => {
  await delay(300);
  usersMock = usersMock.map(u => (u.id === id ? { ...u, ...userData } : u));
  return usersMock.find(u => u.id === id);
};

export const deleteUser = async (id) => {
  await delay(200);
  usersMock = usersMock.filter(u => u.id !== id);
  return true;
};
