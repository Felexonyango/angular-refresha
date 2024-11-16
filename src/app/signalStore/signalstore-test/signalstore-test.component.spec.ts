import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalstoreTestComponent } from './signalstore-test.component';

describe('SignalstoreTestComponent', () => {
  let component: SignalstoreTestComponent;
  let fixture: ComponentFixture<SignalstoreTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalstoreTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalstoreTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
