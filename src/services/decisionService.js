// src/services/decisionService.js

let decisionsMock = [
  {
    id: 1,
    decisionDate: '2024-05-10',
    mention: 'Très Bien',
    verdict: 'APPROVED',  // correspond à DecisionVerdict enum
    pvPath: '/docs/pv_1.pdf',
    attestationPath: '/docs/attestation_1.pdf',
    madeBy: 'Mme Dupont',
    madeByRole: 'COORDINATOR', // correspond à CommissionRole enum
    comment: 'Validation conforme',
    mobilityId: 1,
  },
  {
    id: 2,
    decisionDate: '2024-05-12',
    mention: 'Bien',
    verdict: 'PENDING',
    pvPath: '',
    attestationPath: '',
    madeBy: '',
    madeByRole: '',
    comment: '',
    mobilityId: 2,
  },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const fetchDecisions = async () => {
  await delay(300);
  return decisionsMock;
};

export const fetchDecisionById = async (id) => {
  await delay(200);
  return decisionsMock.find((d) => d.id === id) || null;
};

export const createDecision = async (decisionData) => {
  await delay(300);
  const newId = decisionsMock.length === 0 ? 1 : Math.max(...decisionsMock.map(d => d.id)) + 1;
  const newDecision = { id: newId, ...decisionData };
  decisionsMock.push(newDecision);
  return newDecision;
};

export const updateDecision = async (id, decisionData) => {
  await delay(300);
  decisionsMock = decisionsMock.map((d) => (d.id === id ? { ...d, ...decisionData } : d));
  return decisionsMock.find((d) => d.id === id);
};

export const deleteDecision = async (id) => {
  await delay(200);
  decisionsMock = decisionsMock.filter((d) => d.id !== id);
  return true;
};
