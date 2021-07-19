import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { PaginatorModel } from "src/app/_models/paginator.model";
import { SponsorsService } from "../_services/sponsors.service";
@Component({
  selector: "app-list-sponsors",
  templateUrl: "./list-sponsors.component.html",
  styleUrls: ["./list-sponsors.component.scss"],
})
export class ListSponsorsComponent implements OnInit {
  sponsorsList = [];
  displayedColumns: string[] = [
    "select",
    "name",
    "country",
    "description",
    "createdBy",
  ];
  dataSource = new MatTableDataSource(this.sponsorsList);
  selection = new SelectionModel<Element>(true, []);
  // MatPaginator Inputs
  length;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;
  paginatorObject: PaginatorModel;
  searchInput: string = "";

  constructor(
    private sponsorsService: SponsorsService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.paginatorObject = {
      activeOrInactive: "B",
      pageSize: 10,
      pageNo: 1,
      search: this.searchInput,
    };
    this.getListData(this.paginatorObject);
  }

  getListData(data: any) {
    this.sponsorsService.getListData(
      data,
      function (data) {
        this.onSuccessResponse(data);
      }.bind(this),
      function (err) {
        console.log("err :: while sponsors listing ==>", err);
      }.bind(this)
    );
  }

  onSuccessResponse(data) {
    this.sponsorsList = data.items;
    this.dataSource = new MatTableDataSource(this.sponsorsList);
    this.changeDetectorRefs.detectChanges();
    this.length = data.totalItems;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    console.log("setPageSizeOptionsInput ::  ==>", setPageSizeOptionsInput);
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(",")
        .map((str) => +str);
    }
  }

  handlePageEvent(event: PageEvent) {
    console.log("event ::  ==>", event);
    this.paginatorObject = {
      activeOrInactive: "B",
      pageSize: event.pageSize,
      pageNo: event.pageIndex + 1,
      search: this.searchInput,
    };
    this.getListData(this.paginatorObject);
    this.masterToggle();
  }

  filterRecord() {
    this.paginatorObject = {
      activeOrInactive: "B",
      pageSize: 10,
      pageNo: 1,
      search: this.searchInput,
    };
    this.getListData(this.paginatorObject);
  }
}
