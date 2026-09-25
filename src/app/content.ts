import { TeamMember, Ticket } from './models';

export const TEAM: readonly TeamMember[] = [
  {
    id: 'claire',
    name: 'Claire',
    role: 'Product Owner',
    initials: 'CL',
    accent: '#f3be56',
    avatarPosition: '2.385% 26.228%',
    principle: 'Le besoin doit rester simple.',
  },
  {
    id: 'marc',
    name: 'Marc',
    role: 'Lead Java',
    initials: 'MA',
    accent: '#7fa6d4',
    avatarPosition: '20.827% 24.554%',
    principle: 'Pense aux tests et à la lisibilité.',
  },
  {
    id: 'ines',
    name: 'Inès',
    role: 'Lead Angular',
    initials: 'IN',
    accent: '#7dd4ca',
    avatarPosition: '39.984% 25.112%',
    principle: "Soigne l'expérience utilisateur.",
  },
  {
    id: 'nora',
    name: 'Nora',
    role: 'QA',
    initials: 'NO',
    accent: '#b39ad9',
    avatarPosition: '58.426% 28.460%',
    principle: 'Teste les cas limites.',
  },
  {
    id: 'sam',
    name: 'Sam',
    role: 'DevSecOps',
    initials: 'SA',
    accent: '#ef9b7f',
    avatarPosition: '77.107% 26.228%',
    principle: 'Attention à la robustesse.',
  },
  {
    id: 'julien',
    name: 'Julien',
    role: 'Architecte système',
    initials: 'JU',
    accent: '#8cc9b2',
    avatarPosition: '94.833% 25.112%',
    principle: "Garde une vision d'ensemble.",
  },
];

export const FIRST_TICKET: Ticket = {
  id: 'US-2841',
  title: 'Régulation thermique : corriger le calcul du seuil',
  technologies: ['Java', 'Backend'],
  context:
    "Le calcul du seuil de régulation thermique retourne parfois une valeur incorrecte lorsque la température extérieure est négative. Le comportement nominal pour les températures positives ne doit pas régresser.",
  acceptanceCriteria: [
    'Le calcul est correct pour les températures négatives et positives.',
    'Des tests unitaires couvrent le cas négatif et au moins un cas nominal.',
    "La modification reste limitée au besoin du ticket.",
  ],
  projectPath: 'training-projects/java/thermal-control',
};
