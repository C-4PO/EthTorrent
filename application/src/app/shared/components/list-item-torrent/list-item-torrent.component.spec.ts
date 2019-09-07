import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemTorrentComponent } from './list-item-torrent.component';

describe('ListItemTorrentComponent', () => {
  let component: ListItemTorrentComponent;
  let fixture: ComponentFixture<ListItemTorrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemTorrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemTorrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
