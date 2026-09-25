export type TicketStatus = 'À FAIRE' | 'EN COURS' | 'EN REVIEW' | 'À CORRIGER' | 'VALIDÉ';

export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly initials: string;
  readonly accent: string;
  readonly principle: string;
}

export interface Ticket {
  readonly id: string;
  readonly title: string;
  readonly technologies: readonly string[];
  readonly context: string;
  readonly acceptanceCriteria: readonly string[];
  readonly projectPath: string;
}

export interface ReviewFinding {
  readonly authorId: string;
  readonly level: 'info' | 'warning' | 'blocking' | 'success';
  readonly message: string;
}

export interface ReviewResult {
  readonly approved: boolean;
  readonly findings: readonly ReviewFinding[];
}
