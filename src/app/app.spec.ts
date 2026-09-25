import { TestBed } from '@angular/core/testing';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('renders the first Java ticket in French', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('US-2841');
    expect(text).toContain('Régulation thermique');
    expect(text).toContain("Critères d'acceptation");
    expect(text).toContain('Votre équipe');
  });

  it('changes the team focus when a teammate is selected', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll('.team-person') as NodeListOf<HTMLButtonElement>,
    );
    const marcButton = buttons.find((button) => button.textContent?.includes('Marc'));

    expect(marcButton).toBeDefined();
    marcButton?.click();
    fixture.detectChanges();

    const focus = fixture.nativeElement.querySelector('.team-focus')?.textContent as string;
    expect(focus).toContain('Marc');
    expect(focus).toContain('Pense aux tests et à la lisibilité.');
  });

  it('opens the external IDE instructions without embedding an editor', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const openProjectButton = Array.from(
      fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>,
    ).find((button) => button.textContent?.includes('Ouvrir le projet'));

    openProjectButton?.click();
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]')?.textContent as string;
    expect(dialog).toContain('Ouvre le projet Java');
    expect(dialog).toContain('training-projects/java/thermal-control');
    expect(dialog).toContain('mvn test');
  });
});
