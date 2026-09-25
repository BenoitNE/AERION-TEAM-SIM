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
});
