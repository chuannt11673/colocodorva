import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewDiaryPage } from './new-diary.page';

describe('NewDiaryPage', () => {
  let component: NewDiaryPage;
  let fixture: ComponentFixture<NewDiaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDiaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewDiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
