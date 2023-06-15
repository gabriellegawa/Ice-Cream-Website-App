import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserDescriptionComponent } from './user-description.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

describe('UserDescriptionComponent', () => {
  let component: UserDescriptionComponent;
  let fixture: ComponentFixture<UserDescriptionComponent>;

  let dataSource: MatTableDataSource<User>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        UserDescriptionComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      errorOnUnknownElements: false,
      errorOnUnknownProperties: false,
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    dataSource = new MatTableDataSource<User>();
    dataSource.data = [
      {
        "_id": 12313212313,
        "firstName": "Stevenson",
        "lastName": "Suhardy",
        "emailAddress": "vensen.teng@gmail.com",
        "phoneNumber": 9059225339,
        "dateOfBirth": "2003-11-05",
        "password": "",
        role: Role.Employee,
      }
    ]

    component.dataSource = dataSource;

    tick();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  }));
});
