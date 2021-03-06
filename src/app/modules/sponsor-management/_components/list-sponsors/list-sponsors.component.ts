import {
  Component,
  OnInit,
  OnDestroy,
  AfterContentInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorSubject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import {
  GroupingState,
  IDeleteAction,
  IDeleteSelectedAction,
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
import { environment } from "src/environments/environment";

@Component({
  selector: "app-list-sponsors",
  templateUrl: "./list-sponsors.component.html",
  styleUrls: ["./list-sponsors.component.scss"],
})
export class ListSponsorsComponent
  implements
    OnInit,
    OnDestroy,
    AfterContentInit,
    IDeleteAction,
    IDeleteSelectedAction,
    IFetchSelectedAction,
    IUpdateStatusForSelectedAction,
    ISortView,
    IGroupingView {
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean = true;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  dataArr: Array<any>;
  paginatorObject: PaginatorModel;
  searchInput: string = "";

  _items$ = new BehaviorSubject<[]>([]);
  pageSize = 10;
  public imageBaseURL = environment.apiUrl;
  @ViewChild("searchSponsorInput", { static: true })
  searchSponsorInput: ElementRef;

  constructor(
    private sponsorsService: SponsorsService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public customerService: CustomersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  // angular lifecircle hooks
  ngOnInit(): void {
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

    this.searchGroup
      .get("searchTerm")
      .valueChanges.subscribe((selectedValue) => {
        this.searchInput = selectedValue;
      });
  }

  ngAfterContentInit() {
    // Get Dynamic data using Resolver
    let listData = this.activatedRoute.snapshot.data.sponsorListData;
    if (listData) {
      this.onSuccessResponse(listData);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  // get List data with pagination
  getListData(data: any) {
    const sb = this.sponsorsService.getListData(data).subscribe((res) => {
      this.onSuccessResponse(res);
    });
    this.subscriptions.push(sb);
  }

  onSuccessResponse(res) {
    this._items$.next(res.items);
    this.isLoading = false;
    this.paginator.total = res.totalItems;
    this.grouping.itemIds = res.items.map((ele) => {
      return ele.id;
    });
  }

  // search Record
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [""],
    });
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

  clear() {
    this.searchSponsorInput.nativeElement.value = "";
    this.searchInput = "";
    this.searchGroup.get("searchTerm").setValue("");
    this.paginatorObject.search = this.searchInput;
    this.getListData(this.paginatorObject);
  }

  filterList() {
    const searchVal = this.searchGroup.get("searchTerm").value;
    this.isLoading = true;
    this.cdr.markForCheck();
    this.paginatorObject.search = searchVal;
    this.searchInput = searchVal;
    this.getListData(this.paginatorObject);
  }

  deleteSelected() {}

  updateStatusForSelected() {}

  fetchSelected() {}
}
