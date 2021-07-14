import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { SponsorsService } from "./_services/sponsors.service";

@Component({
  selector: "app-sponsor-management",
  templateUrl: "./sponsor-management.component.html",
  styleUrls: ["./sponsor-management.component.scss"],
})
export class SponsorManagementComponent implements OnInit {
  sponsorsList = [];
  displayedColumns = ["select", "id", "name", "description"];
  dataSource;
  selection = new SelectionModel<Element>(true, []);
  // MatPaginator Inputs
  length;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private sponsorsService: SponsorsService) {}

  ngOnInit(): void {
    this.getListData();
  }

  getListData() {
    this.sponsorsService.getListData(
      {},
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
    console.log('setPageSizeOptionsInput ::  ==>' , setPageSizeOptionsInput);
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  handlePageEvent(event:PageEvent){
    console.log('event ::  ==>' , event);
  }

}
