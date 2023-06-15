import { Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppServiceService } from '../../app-service.service';
import { User } from '../../models/user'
import { ModalService } from 'src/app/_modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserFormComponent } from '../update-user-form/update-user-form.component';



@Component({
  selector: 'app-user-description',
  templateUrl: './user-description.component.html',
  styleUrls: ['./user-description.component.scss']
})
export class UserDescriptionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  public displayedColumns: string[] = ['First Name', 'Last Name', 'Email Address', 'Phone Number', 'Date Of Birth'];
  public userData: string[] = ['firstName', 'lastName', 'emailAddress', 'phoneNumber', 'dateOfBirth'];
  public columnsToDisplay: string[] = [...this.userData, 'Actions'];
  public dataSource: MatTableDataSource<User>;
  private serviceSubscribe !: Subscription;
  public columnsFilters = {};
  userList: User[] = [];

  @Output("on-submit")
  emitter = new EventEmitter

  constructor(public modalService: ModalService, private service: AppServiceService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<User>();
  }

  getUserList() {
    this.service.getUserList().subscribe((Response) => {
      this.userList = Response;
      this.dataSource.data = this.userList;
      console.log('Response from API', Response)
    }, (error) => {
      console.error('error', Response)
    })
  }

  ngOnInit(): void {
    this.getUserList()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    if (this.serviceSubscribe) {
      this.serviceSubscribe.unsubscribe();
    }
  }

  editUser(u: User): void {
    const dialogRef = this.dialog.open(UpdateUserFormComponent, {
      data: u,
      width: '25%',
    });
  }

  String(number: number): String {
    return String(number)
  }

  delete(u: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteUser(u).subscribe(
          data => console.log('Success!', data),
          error => console.error('error!', error)
        )

        this.service.reloadComponent(true);

        this.emitter.emit()
      }
    });
  }



}
