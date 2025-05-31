const mockMobilities = [
  {
    id: 1,
    program: "Échange Erasmus",
    startDate: "2025-09-01",
    endDate: "2026-01-31",
    type: "EXCHANGE",
    status: "PENDING_DOCS",
    student_id: 101,
    comments: "Besoin de vérifier les notes converties",
    student: {
      id: 101,
      fullName: "Alice Dupont",
      filiere: "GL",
      email: "alice@example.com"
    },
    documents: [
      {
        id: 201,
        type: "TRANSCRIPT",
        originalFilename: "transcript_alice.pdf",
        ocrExtracted: true,
        uploadDate: "2025-06-20"
      }
    ],
  },
  {
    id: 2,
    program: "Stage à l’étranger",
    startDate: "2025-07-01",
    endDate: "2025-10-31",
    type: "DOUBLE_DIPLOMA",
    status: "VALIDATED",
    student_id: 102,
    comments: "Dossier validé sans remarque",
    student: {
      id: 102,
      fullName: "Mohamed El Idrissi",
      filiere: "IA",
      email: "mohamed@example.com"
    },
    documents: [
      {
        id: 202,
        type: "ATTESTATION_REUSSITE",
        originalFilename: "attestation_mohamed.pdf",
        ocrExtracted: false,
        uploadDate: "2025-05-15"
      }
    ],
  }
];

const mockDecisions = [
  {
    id: 1,
    mobilityProgram: "Échange Erasmus",
    decisionDate: "2025-07-15",
    verdict: "Validé",
    madeBy: "Prof. Durand",
    comment: "Dossier conforme"
  },
  {
    id: 2,
    mobilityProgram: "Stage à l’étranger",
    decisionDate: "2025-06-20",
    verdict: "Refusé",
    madeBy: "Mme Martin",
    comment: "Notes insuffisantes"
  }
];


function getPendingMobilities() {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockMobilities), 700);
  });
}

function getDecisionsHistory() {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockDecisions), 700);
  });
}

export default {
  getPendingMobilities,
  getDecisionsHistory,
};
