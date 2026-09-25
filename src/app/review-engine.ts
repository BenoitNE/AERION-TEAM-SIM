import { ReviewFinding, ReviewResult } from './models';

export interface Submission {
  readonly diff: string;
  readonly testsRunLocally: boolean;
}

export function reviewSubmission(submission: Submission): ReviewResult {
  const diff = submission.diff.trim();
  const findings: ReviewFinding[] = [];

  if (!diff) {
    return {
      approved: false,
      findings: [{
        authorId: 'marc',
        level: 'blocking',
        message: "Je n'ai rien à reviewer. Colle le `git diff` de ta modification.",
      }],
    };
  }

  const touchesProductionCode = /ThermalThresholdCalculator\.java/i.test(diff);
  const touchesTests = /ThermalThresholdCalculatorTest\.java|src\/test/i.test(diff);
  const negativeCase = /negative|négatif|-\d+|minus/i.test(diff);
  const changesPom = /pom\.xml/i.test(diff);
  const addedLines = diff
    .split(/\r?\n/)
    .filter((line) => line.startsWith('+') && !line.startsWith('+++')).length;

  if (!touchesProductionCode) {
    findings.push({
      authorId: 'marc',
      level: 'blocking',
      message: "Je ne vois pas de modification de `ThermalThresholdCalculator.java` dans le diff.",
    });
  }

  if (!touchesTests) {
    findings.push({
      authorId: 'marc',
      level: 'blocking',
      message: "La correction doit être protégée par un test de régression.",
    });
  } else if (!negativeCase) {
    findings.push({
      authorId: 'nora',
      level: 'blocking',
      message: "Je vois des tests, mais pas de cas négatif explicite. C'est précisément le cas qui a déclenché le ticket.",
    });
  }

  if (!submission.testsRunLocally) {
    findings.push({
      authorId: 'nora',
      level: 'blocking',
      message: "Avant la review, lance la suite de tests dans ton IDE et confirme qu'elle passe.",
    });
  }

  if (changesPom) {
    findings.push({
      authorId: 'julien',
      level: 'warning',
      message: "Le `pom.xml` a changé pour un bug métier très local. Vérifie que cette modification est réellement nécessaire.",
    });
  }

  if (addedLines > 120) {
    findings.push({
      authorId: 'marc',
      level: 'warning',
      message: "Le diff est assez large pour ce ticket. Cherche une correction plus ciblée si possible.",
    });
  }

  const blocking = findings.some((finding) => finding.level === 'blocking');

  if (!blocking) {
    findings.push({
      authorId: 'claire',
      level: 'success',
      message: 'Le besoin fonctionnel reste bien ciblé.',
    });
    findings.push({
      authorId: 'marc',
      level: 'success',
      message: 'La modification contient le code et la couverture de régression attendus. Review approuvée pour le prototype.',
    });
  }

  return {
    approved: !blocking,
    findings,
  };
}
