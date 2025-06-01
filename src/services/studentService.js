const mockStudentInfo = {
  id: 101,
  fullName: "Hamza Elmadani",
  email: "hamza@ensias.com",
  filiere: "GL",
  partner: {
    id: 201,
    universityName: "ENSEEIHT",
    country: "France",
    gradingScale: "France"
  }
};

const mockMobilities = [
  {
    id: 1,
    program: "Échange ",
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
            label: "S5",
            type: "NORMAL",
            modules: [
              {
                id: 501,
                name: "AI",
                originalGrade: 18,
                convertedGrade: 20,
                ects: 6,
                isPfe: false
              },
              {
                id: 502,
                name: "Databases",
                originalGrade: 17,
                convertedGrade: 20,
                ects: 4,
                isPfe: false
              },
              {
                id: 503,
                name: "Operating Systems",
                originalGrade: 16,
                convertedGrade: 19.2,
                ects: 6,
                isPfe: false
              },
              {
                id: 504,
                name: " Architecture des Systèmes d'exploitation",
                originalGrade: 15,
                convertedGrade: 18,
                ects: 6,
                isPfe: false
              },
              {
                id: 505,
                name: "Systèmes de télécom sans fils et mobiles",
                originalGrade: 14.5,
                convertedGrade: 17.4,
                ects: 6,
                isPfe: false
              },
              {
                id: 506,
                name: "Science des Réseaux et Apprentissage",
                originalGrade: 12,
                convertedGrade: 14.4,
                ects: 6,
                isPfe: false
              },
              {
                id: 506,
                name: " Soft and Human Skills",
                originalGrade: 15,
                convertedGrade: 18,
                ects: 6,
                isPfe: false
              }
            ]
          },
          {
            id: 402,
            label: "S6",
            type: "PFE",
            modules: [
              {
                id: 503,
                name: "PFE",
                originalGrade: 16,
                convertedGrade: 19.2,
                ects: null,
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
