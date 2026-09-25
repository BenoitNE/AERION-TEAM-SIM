import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { FIRST_TICKET, TEAM } from './content';
import { ReviewResult, TicketStatus } from './models';
import { reviewSubmission } from './review-engine';

const STORAGE_KEY = 'aerion.prototype01.ticket-status';

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
  protected readonly diff = signal('');
  protected readonly testsRunLocally = signal(false);
  protected readonly review = signal<ReviewResult | null>(null);
  protected readonly sprintProgress = computed(() => this.status() === 'VALIDÉ' ? 100 : 35);

  protected openProject(): void {
    window.alert(
      `Ouvre ce dossier dans ton IDE :\n\n${this.ticket.projectPath}\n\nPuis lance : mvn test`,
    );
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
    this.setStatus(result.approved ? 'VALIDÉ' : 'À CORRIGER');
    this.submissionOpen.set(false);
  }

  protected memberName(id: string): string {
    return this.team.find((member) => member.id === id)?.name ?? 'Équipe';
  }

  protected memberInitials(id: string): string {
    return this.team.find((member) => member.id === id)?.initials ?? 'EQ';
  }

  protected memberAccent(id: string): string {
    return this.team.find((member) => member.id === id)?.accent ?? '#b9c8d8';
  }

  protected reset(): void {
    this.diff.set('');
    this.testsRunLocally.set(false);
    this.review.set(null);
    this.setStatus('À FAIRE');
  }

  private setStatus(status: TicketStatus): void {
    this.status.set(status);
    localStorage.setItem(STORAGE_KEY, status);
  }
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
