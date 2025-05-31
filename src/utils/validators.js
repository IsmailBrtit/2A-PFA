import * as yup from 'yup';

export const partnerSchema = yup.object().shape({
  fullName: yup.string().required('Le nom complet est requis'),
  email: yup.string().email('Email invalide').required('Email est requis'),
  universityName: yup.string().required('Nom de l’université est requis'),
  country: yup.string().required('Pays est requis'),
  gradingScale: yup.string(),  // Optionnel, pas obligatoire
});

export const mobilitySchema = yup.object().shape({
  program: yup.string().required('Le programme est requis'),
  type: yup.string().required('Le type est requis'),
  startDate: yup.date().required('La date de début est requise'),
  endDate: yup
    .date()
    .min(yup.ref('startDate'), 'La date de fin doit être après la date de début')
    .required('La date de fin est requise'),
  status: yup.string().required('Le statut est requis'),
});