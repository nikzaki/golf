import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorSubject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import {
  GroupingState,
  ICreateAction,
  IDeleteAction,
  IDeleteSelectedAction,
  IEditAction,
  IFetchSelectedAction,
  IFilterView,
  IGroupingView,
  ISearchView,
  ISortView,
  IUpdateStatusForSelectedAction,
  PaginatorState,
  SortState,
} from "src/app/_metronic/shared/crud-table";
import { DeleteModalModel } from "src/app/_models/delete-modal-model";
import { PaginatorModel } from "src/app/_models/paginator.model";
import { RestApiUrls } from "src/app/_models/rest-api-urls";
import { DeleteModalComponent } from "src/app/_shared_components/delete-modal/delete-modal.component";
import { CustomersService } from "../../_services/customers.service";
import { SponsorsService } from "../../_services/sponsors.service";
@Component({
  selector: "app-list-sponsors",
  templateUrl: "./list-sponsors.component.html",
  styleUrls: ["./list-sponsors.component.scss"],
})
export class ListSponsorsComponent
  implements
    OnInit,
    OnDestroy,
    ICreateAction,
    IEditAction,
    IDeleteAction,
    IDeleteSelectedAction,
    IFetchSelectedAction,
    IUpdateStatusForSelectedAction,
    ISortView,
    IFilterView,
    IGroupingView,
    ISearchView,
    IFilterView {
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  dataArr: Array<any>;
  paginatorObject: PaginatorModel;
  searchInput: string = "";

  _items$ = new BehaviorSubject<[]>([]);
  pageSize = 10;

  constructor(
    private sponsorsService: SponsorsService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public customerService: CustomersService,
    private router: Router
  ) {}

  // angular lifecircle hooks
  ngOnInit(): void {
    // Filter Form
    this.filterForm();
    // Search Form
    this.searchForm();
    // Initial paginator Object
    this.paginatorObject = {
      activeOrInactive: "B",
      pageSize: 10,
      pageNo: 1,
      search: this.searchInput,
    };
    // Get Dynamic data
    this.getListData(this.paginatorObject);
    this.grouping = this.customerService.grouping;
    this.paginator = this.customerService.paginator;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  // get List data with pagination
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
    this._items$.next(data.items);
    this.paginator.total = data.totalItems;
    this.grouping.itemIds = data.items.map((ele) => {
      return ele.id;
    });
  }

  // filtration
  filterForm() {
    this.filterGroup = this.fb.group({
      status: [""],
      type: [""],
      searchTerm: [""],
    });
    this.subscriptions.push(
      this.filterGroup.controls.status.valueChanges.subscribe(() =>
        this.filter()
      )
    );
    this.subscriptions.push(
      this.filterGroup.controls.type.valueChanges.subscribe(() => this.filter())
    );
  }

  filter() {
    const filter = {};
    const status = this.filterGroup.get("status").value;
    if (status) {
      filter["status"] = status;
    }

    const type = this.filterGroup.get("type").value;
    if (type) {
      filter["type"] = type;
    }
    this.customerService.patchState({ filter });
  }
  3;
  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [""],
    });
    const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
      .pipe(
        /*
      The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator,
      we are limiting the amount of server requests emitted to a maximum of one every 150ms
      */
        debounceTime(250),
        distinctUntilChanged()
      )
      .subscribe((val) => this.search(val));
    this.subscriptions.push(searchEvent);
  }

  search(searchTerm: string) {
    this.paginatorObject.search = searchTerm;
    this.searchInput = searchTerm;
    this.getListData(this.paginatorObject);
  }

  // sorting
  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = "asc";
    } else {
      sorting.direction = sorting.direction === "asc" ? "desc" : "asc";
    }
    this.customerService.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.paginatorObject = {
      activeOrInactive: "B",
      pageSize: paginator.pageSize,
      pageNo: paginator.page,
      search: this.searchInput,
    };
    this.pageSize = paginator.pageSize;
    this.getListData(this.paginatorObject);
    this.grouping.selectedRowIds = new Set<number>();
  }

  // form actions
  create() {
    this.edit(undefined);
    this.router.navigateByUrl("/sponsor-management/add");
  }

  edit(id: number) {
    this.router.navigate([`sponsor-management/edit/${id}`]);
  }

  delete(id: number) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    let data: DeleteModalModel = {
      title: "Delete Sponsor",
      content: "Sponsor",
      id: id,
      apiAction: RestApiUrls.sponsors.deleteSponsor,
    };
    modalRef.componentInstance.data = data;
    modalRef.result.then(
      () => {
        this.paginatorObject = {
          activeOrInactive: "B",
          pageSize: 10,
          pageNo: 1,
          search: "",
        };
        this.getListData(this.paginatorObject);
        this.searchGroup.reset();
      },
      () => {}
    );
  }

  deleteSelected() {}

  updateStatusForSelected() {}

  fetchSelected() {}
}
