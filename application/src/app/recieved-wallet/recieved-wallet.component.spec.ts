import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedWalletComponent } from './recieved-wallet.component';

describe('RecievedWalletComponent', () => {
  let component: RecievedWalletComponent;
  let fixture: ComponentFixture<RecievedWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievedWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievedWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
