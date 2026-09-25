import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { FIRST_TICKET, TEAM } from './content';
import { ReviewResult, TeamMember, TicketStatus } from './models';
import { reviewSubmission } from './review-engine';

const STORAGE_KEY = 'aerion.prototype01.ticket-status';
const ONBOARDING_STORAGE_KEY = 'aerion.prototype01.onboarding-complete';

type OnboardingTarget = 'welcome' | 'sprint' | 'ticket' | 'project' | 'team' | 'review';

interface OnboardingStep {
  readonly target: OnboardingTarget;
  readonly title: string;
  readonly message: string;
  readonly action: string;
}

const ONBOARDING_STEPS: readonly OnboardingStep[] = [
  {
    target: 'welcome',
    title: 'Bienvenue dans l’équipe !',
    message:
      "Je suis Claire, Product Owner. Ici, tu vas apprendre en travaillant comme dans une vraie équipe : des tickets, un besoin métier, du code, des tests et des retours de tes collègues.",
    action: 'Découvrir l’interface',
  },
  {
    target: 'sprint',
    title: 'Ton sprint',
    message:
      "Ici tu vois où en est le sprint. La progression avance quand tes tickets passent du travail en cours à la review, puis à la validation.",
    action: 'Voir le ticket',
  },
  {
    target: 'ticket',
    title: 'Le ticket est ton point de départ',
    message:
      "Lis le contexte et les critères d’acceptation avant de coder. L’objectif n’est pas de deviner la solution : il faut comprendre le besoin et produire une modification ciblée.",
    action: 'Voir le projet',
  },
  {
    target: 'project',
    title: 'Tu codes dans ton vrai IDE',
    message:
      "Ce bouton te donne le projet à ouvrir dans IntelliJ, WebStorm ou l’IDE de ton choix. AERION ne remplace pas tes outils : tu compiles, testes, débugges et utilises Git pour de vrai.",
    action: 'Rencontrer l’équipe',
  },
  {
    target: 'team',
    title: 'Tu n’es pas seul',
    message:
      "Claire garde le cap métier, Marc t’accompagne sur Java, Nora challenge les tests, Inès le front, Sam la robustesse et Julien l’architecture. Clique sur eux quand tu veux un conseil.",
    action: 'Voir la review',
  },
  {
    target: 'review',
    title: 'Soumets ton travail pour review',
    message:
      "Quand tes tests passent, récupère ton git diff et colle-le ici. L’équipe te répondra comme en code review : validation, remarque ciblée ou demande de correction. Puis on recommence avec des sujets plus exigeants.",
    action: 'Commencer',
  },
];

@Component({
  selector: 'ats-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly team = TEAM;
  protected readonly ticket = FIRST_TICKET;
  protected readonly status = signal<TicketStatus>(readStatus());
  protected readonly submissionOpen = signal(false);
  protected readonly projectHelpOpen = signal(false);
  protected readonly projectPathCopied = signal(false);
  protected readonly diff = signal('');
  protected readonly testsRunLocally = signal(false);
  protected readonly review = signal<ReviewResult | null>(null);
  protected readonly selectedMemberId = signal<string | null>(null);
  protected readonly onboardingOpen = signal(!readOnboardingCompleted());
  protected readonly onboardingStepIndex = signal(0);
  protected readonly onboardingSteps = ONBOARDING_STEPS;
  protected readonly onboardingStep = computed(
    () => this.onboardingSteps[this.onboardingStepIndex()] ?? this.onboardingSteps[0],
  );
  protected readonly onboardingIsLastStep = computed(
    () => this.onboardingStepIndex() === this.onboardingSteps.length - 1,
  );

  protected readonly sprintProgress = computed(() => {
    switch (this.status()) {
      case 'À FAIRE':
        return 20;
      case 'EN COURS':
        return 45;
      case 'EN REVIEW':
        return 70;
      case 'À CORRIGER':
        return 72;
      case 'VALIDÉ':
        return 100;
    }
  });

  protected readonly activeMember = computed<TeamMember>(() => {
    const id = this.selectedMemberId() ?? this.contextualMemberId();
    return this.team.find((member) => member.id === id) ?? this.team[0];
  });

  protected readonly activeMemberMessage = computed(() => {
    if (this.selectedMemberId()) {
      return this.activeMember().principle;
    }

    switch (this.status()) {
      case 'À FAIRE':
        return "Commence par comprendre le besoin avant de toucher au code. Le ticket est volontairement petit.";
      case 'EN COURS':
        return "Garde un diff ciblé. Reproduis d'abord le bug avec un test, puis corrige le comportement.";
      case 'EN REVIEW':
        return "Je relis surtout le périmètre, le test de régression et la lisibilité de la correction.";
      case 'À CORRIGER':
        return "La review t'a donné un signal précis. Corrige ce point sans élargir inutilement le ticket.";
      case 'VALIDÉ':
        return "Ticket validé. Une petite correction bien testée vaut mieux qu'une grosse refonte hors sujet.";
    }
  });

  protected openProject(): void {
    this.projectHelpOpen.set(true);
    this.projectPathCopied.set(false);

    if (this.status() === 'À FAIRE') {
      this.setStatus('EN COURS');
    }
  }

  protected closeProjectHelp(): void {
    this.projectHelpOpen.set(false);
  }

  protected async copyProjectPath(): Promise<void> {
    try {
      await navigator.clipboard?.writeText(this.ticket.projectPath);
    } finally {
      this.projectPathCopied.set(true);
    }
  }

  protected openSubmission(): void {
    this.submissionOpen.set(true);
    if (this.status() === 'À FAIRE') {
      this.setStatus('EN COURS');
    }
  }

  protected closeSubmission(): void {
    this.submissionOpen.set(false);
  }

  protected updateDiff(event: Event): void {
    this.diff.set((event.target as HTMLTextAreaElement).value);
  }

  protected updateTestsRun(event: Event): void {
    this.testsRunLocally.set((event.target as HTMLInputElement).checked);
  }

  protected submit(): void {
    this.setStatus('EN REVIEW');

    const result = reviewSubmission({
      diff: this.diff(),
      testsRunLocally: this.testsRunLocally(),
    });

    this.review.set(result);
    this.selectedMemberId.set(result.findings[0]?.authorId ?? null);
    this.setStatus(result.approved ? 'VALIDÉ' : 'À CORRIGER');
    this.submissionOpen.set(false);
  }

  protected openOnboarding(): void {
    this.onboardingStepIndex.set(0);
    this.onboardingOpen.set(true);
  }

  protected closeOnboarding(): void {
    this.onboardingOpen.set(false);
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
  }

  protected previousOnboardingStep(): void {
    this.onboardingStepIndex.update((index) => Math.max(0, index - 1));
  }

  protected nextOnboardingStep(): void {
    if (this.onboardingIsLastStep()) {
      this.closeOnboarding();
      return;
    }

    this.onboardingStepIndex.update((index) => index + 1);
  }

  protected onboardingTargets(target: OnboardingTarget): boolean {
    return this.onboardingOpen() && this.onboardingStep().target === target;
  }

  protected selectMember(id: string): void {
    this.selectedMemberId.update((current) => current === id ? null : id);
  }

  protected isActiveMember(id: string): boolean {
    return this.activeMember().id === id;
  }

  protected memberName(id: string): string {
    return this.team.find((member) => member.id === id)?.name ?? 'Équipe';
  }

  protected memberAccent(id: string): string {
    return this.team.find((member) => member.id === id)?.accent ?? '#b9c8d8';
  }

  protected memberAvatarPosition(id: string): string {
    return this.team.find((member) => member.id === id)?.avatarPosition ?? '50% 50%';
  }

  protected reset(): void {
    this.diff.set('');
    this.testsRunLocally.set(false);
    this.review.set(null);
    this.selectedMemberId.set(null);
    this.projectHelpOpen.set(false);
    this.projectPathCopied.set(false);
    this.onboardingOpen.set(false);
    this.onboardingStepIndex.set(0);
    this.setStatus('À FAIRE');
  }

  private contextualMemberId(): string {
    switch (this.status()) {
      case 'À FAIRE':
        return 'claire';
      case 'EN COURS':
      case 'EN REVIEW':
        return 'marc';
      case 'À CORRIGER':
        return 'nora';
      case 'VALIDÉ':
        return 'claire';
    }
  }

  private setStatus(status: TicketStatus): void {
    this.status.set(status);
    localStorage.setItem(STORAGE_KEY, status);
  }
}

function readOnboardingCompleted(): boolean {
  return localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'true';
}

function readStatus(): TicketStatus {
  const value = localStorage.getItem(STORAGE_KEY);
  return value === 'À FAIRE'
    || value === 'EN COURS'
    || value === 'EN REVIEW'
    || value === 'À CORRIGER'
    || value === 'VALIDÉ'
    ? value
    : 'À FAIRE';
}
