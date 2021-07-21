import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { SponsorsService } from "src/app/modules/sponsor-management/_services/sponsors.service";
import { DeleteModalModel } from "src/app/_models/delete-modal-model";

@Component({
  selector: "app-delete-modal",
  templateUrl: "./delete-modal.component.html",
  styleUrls: ["./delete-modal.component.scss"],
})
export class DeleteModalComponent implements OnInit {
  @Input() data: DeleteModalModel;
  isLoading = false;
  subscriptions: Subscription[] = [];
  isError: boolean = false;

  constructor(
    private sponsorsService: SponsorsService,
    public modal: NgbActiveModal // public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  deleteCustomer() {
    this.isLoading = true;
    this.sponsorsService.delete(
      {
        id: this.data.id,
        apiMethod: this.data.apiAction,
      },
      function (data) {
        this.onSuccessResponse(data);
      }.bind(this),
      function (err) {
        console.log("err :: while deleting sponsors ==>", err);
        this.onError(err);
      }.bind(this)
    );
  }

  onSuccessResponse(data: any) {
    if (data) {
      this.modal.close();
    }
  }

  onError(err: any) {
    this.isError = true;
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
