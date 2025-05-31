// src/services/documentService.js

let documentsMock = [
  {
    id: 1,
    type: 'TRANSCRIPT',
    filePath: '/uploads/transcript_erasmus.pdf',
    originalFilename: 'transcript_erasmus.pdf',
    contentType: 'application/pdf',
    ocrExtracted: true,
    uploadDate: '2024-04-15',
    rawOcrText: 'Texte OCR exemple extrait...',
    fileHash: 'abc123sha256hash',
    mobilityId: 1,
  },
  {
    id: 2,
    type: 'ATTESTATION_REUSSITE',
    filePath: '/uploads/attestation_stage.pdf',
    originalFilename: 'attestation_stage.pdf',
    contentType: 'application/pdf',
    ocrExtracted: false,
    uploadDate: '2024-05-01',
    rawOcrText: '',
    fileHash: 'def456sha256hash',
    mobilityId: 2,
  },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const fetchDocuments = async () => {
  await delay(300);
  return documentsMock;
};

export const fetchDocumentById = async (id) => {
  await delay(200);
  return documentsMock.find((d) => d.id === id) || null;
};

export const createDocument = async (docData) => {
  await delay(300);
  const newId = documentsMock.length === 0 ? 1 : Math.max(...documentsMock.map(d => d.id)) + 1;
  const newDoc = { id: newId, ...docData };
  documentsMock.push(newDoc);
  return newDoc;
};

export const updateDocument = async (id, docData) => {
  await delay(300);
  documentsMock = documentsMock.map((d) => (d.id === id ? { ...d, ...docData } : d));
  return documentsMock.find((d) => d.id === id);
};

export const deleteDocument = async (id) => {
  await delay(200);
  documentsMock = documentsMock.filter((d) => d.id !== id);
  return true;
};
