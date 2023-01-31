import { Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../../app-service.service';
import { User } from '../../models/user'
import { ModalService } from 'src/app/_modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-user-description',
  templateUrl: './user-description.component.html',
  styleUrls: ['./user-description.component.scss']
})
export class UserDescriptionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  public displayedColumns: string[] = ['firstName', 'lastName', 'emailAddress', 'phoneNumber', 'dateOfBirth'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'Actions'];
  public dataSource: MatTableDataSource<User>;
  private serviceSubscribe !: Subscription;
  public columnsFilters = {};
  userList: User[] = [];

  userToEdit?: User

  constructor(public modalService: ModalService, private service: AppServiceService) {
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
    this.serviceSubscribe.unsubscribe();
  }

  editUser(u: User) {
    this.userToEdit = u
  }

  commitEdit(u: User) {
    //Commit to the database

    this.ngOnInit();

    window.location.reload();

    this.userToEdit = undefined
  }

  onCancel() {

    this.userToEdit = undefined
  }

  String(number: number) {
    return String(number)
  }



}
