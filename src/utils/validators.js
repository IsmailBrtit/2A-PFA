import * as yup from 'yup';

export const partnerSchema = yup.object().shape({
  fullName: yup.string().required('Le nom complet est requis'),
  email: yup.string().email('Email invalide').required('Email est requis'),
  universityName: yup.string().required('Nom de l’université est requis'),
  country: yup.string().required('Pays est requis'),
  gradingScale: yup.string(),  // Optionnel, pas obligatoire
});
