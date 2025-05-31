const mockStudentInfo = {
  id: 101,
  fullName: "Alice Dupont",
  email: "alice.dupont@example.com",
  filiere: "GL",
  partner: {
    id: 201,
    universityName: "Université de Paris",
    country: "France",
    gradingScale: "0-20"
  }
};

const mockMobilities = [
  {
    id: 1,
    program: "Échange Erasmus",
    startDate: "2025-09-01",
    endDate: "2026-01-31",
    type: "EXCHANGE",
    status: "PENDING_DOCS",
    decision: {
      id: 11,
      decisionDate: "2025-07-15",
      mention: "Mention Bien",
      verdict: "VALIDE",
      pvPath: "/docs/pv11.pdf",
      attestationPath: "/docs/attestation11.pdf",
      madeBy: "Prof. Durand",
      madeByRole: "COORDINATOR",
      comment: "Dossier conforme"
    },
    documents: [
      {
        id: 201,
        type: "TRANSCRIPT",
        filePath: "/docs/transcript201.pdf",
        originalFilename: "transcript_alice.pdf",
        contentType: "application/pdf",
        ocrExtracted: true,
        uploadDate: "2025-06-20",
        rawOcrText: "Extrait OCR du bulletin...",
        fileHash: "a1b2c3d4e5f6"
      }
    ],
    academicYears: [
      {
        id: 301,
        yearLabel: "2025-2026",
        semesters: [
          {
            id: 401,
            label: "S1",
            type: "NORMAL",
            modules: [
              {
                id: 501,
                name: "Mathématiques",
                originalGrade: 14.5,
                convertedGrade: 13.5,
                ects: 6,
                isPfe: false
              },
              {
                id: 502,
                name: "Physique",
                originalGrade: 12,
                convertedGrade: 11,
                ects: 4,
                isPfe: false
              }
            ]
          },
          {
            id: 402,
            label: "S2",
            type: "NORMAL",
            modules: [
              {
                id: 503,
                name: "Informatique",
                originalGrade: 15,
                convertedGrade: 14,
                ects: 6,
                isPfe: false
              }
            ]
          }
        ]
      }
    ]
  }
];

function getStudentInfo() {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockStudentInfo), 500);
  });
}

function getStudentMobilities() {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockMobilities), 700);
  });
}

export default {
  getStudentInfo,
  getStudentMobilities
};
