import { Component, ViewChild } from '@angular/core';
import UserJson from './user.json';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {HttpService} from './http.service';

interface DATA {
  id : Number;
  name : String;
  username : String;
  email : String;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'new-app';
  authentication = true;
  displayedColumns = ['id', 'name', 'username', 'email'];
  dataSource: MatTableDataSource<DATA>;
  currentPage = 1;
  pageSize = 20;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public httpservice : HttpService){
      const data: DATA[] = UserJson;
      this.dataSource = new MatTableDataSource(data);
  }

  ngOnInit(): void {
    this.getPaginateItems();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }

  getPaginateItems(){
    this.httpservice.getItems(this.currentPage, this.pageSize)
      .subscribe(res => {
        this.dataSource = res;
      });
  }
}
