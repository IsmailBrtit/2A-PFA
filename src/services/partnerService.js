
import api  from './mockApi';

let partnersMock = [
  {
    id: 1,
    fullName: 'Université Hassan II',
    email: 'contact@uh2c.ma',
    password: '',
    role: 'PARTNER',
    universityName: 'Université Hassan II',
    country: 'Maroc',
    gradingScale: '20 points',
  },
  {
    id: 2,
    fullName: 'Université Paris-Saclay',
    email: 'contact@upsaclay.fr',
    password: '',
    role: 'PARTNER',
    universityName: 'Université Paris-Saclay',
    country: 'France',
    gradingScale: '20 points',
  },
];

const studentsMock = [
  {
    id: 101,
    fullName: "Alice Dupont",
    email: "alice.dupont@example.com",
    filiere: "GL",
    mobilityStatus: "PENDING_DOCS",
    documents: [
      {
        id: 201,
        type: "TRANSCRIPT",
        originalFilename: "transcript_alice.pdf",
        uploadDate: "2025-06-20",
        ocrExtracted: true
      }
    ]
  },
  {
    id: 102,
    fullName: "Mohamed El Idrissi",
    email: "mohamed@example.com",
    filiere: "IA",
    mobilityStatus: "VALIDATED",
    documents: [
      {
        id: 202,
        type: "ATTESTATION_REUSSITE",
        originalFilename: "attestation_mohamed.pdf",
        uploadDate: "2025-05-15",
        ocrExtracted: false
      }
    ]
  }
];


// Mock delay pour simuler API
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const partnerService = {
  getAll: async () => {
    await delay(500);
    return partnersMock;
  },

  getById: async (id) => {
    await delay(300);
    return partnersMock.find((p) => p.id === id) || null;
  },

  create: async (partner) => {
    await delay(500);
    const newPartner = { ...partner, id: partnersMock.length + 1 };
    partnersMock.push(newPartner);
    return newPartner;
  },

  update: async (id, partner) => {
    await delay(500);
    partnersMock = partnersMock.map((p) => (p.id === id ? { ...p, ...partner } : p));
    return partnersMock.find((p) => p.id === id);
  },

  delete: async (id) => {
    await delay(300);
    partnersMock = partnersMock.filter((p) => p.id !== id);
    return true;
  },

   getPartnerStudents: async () => {
    await delay(500);
    return studentsMock;
  },
};
