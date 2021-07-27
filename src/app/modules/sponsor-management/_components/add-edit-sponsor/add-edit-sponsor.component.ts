import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CommonService } from "src/app/_services/common.service";
import { generateForm } from "src/app/_shared_components/dynamic-form/form-generate";
import { environment } from "src/environments/environment";
import * as formService from "../../../../_shared_components/dynamic-form/fields";
import { SponsorsService } from "../../_services/sponsors.service";
@Component({
  selector: "app-add-edit-sponsor",
  templateUrl: "./add-edit-sponsor.component.html",
  styleUrls: ["./add-edit-sponsor.component.scss"],
})
export class AddEditSponsorComponent
  implements OnInit, AfterContentInit, OnDestroy {
  public formGroup: FormGroup;
  public form = formService.segment["sponsorForm"].fields;
  private subscriptions: Subscription[] = [];
  public title: string = "New Record";
  isEdit: boolean = false;
  isDisabled: boolean = false;
  countryList: any = [];
  fileObj: any;
  imageSource: string = "assets/media/users/blank.png";
  id: string;
  sponsorDetailObj: any;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private sponsorsService: SponsorsService
  ) {}

  ngOnInit(): void {
    this.getCountryList();
    const sb = this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
        this.isEdit = true;
        this.title = "Edit Sponsors";
      }
    });
    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  ngAfterContentInit() {
    const fieldArray = generateForm(this.form);
    this.formGroup = this.fb.group(fieldArray);
    let sponsorDetail = this.activatedRoute.snapshot.data.sponsorDetail;
    if (sponsorDetail) {
      this.imageSource = sponsorDetail.image
        ? `${environment.apiUrl}${sponsorDetail.image}`
        : "assets/media/users/blank.png";
      this.formGroup.patchValue(sponsorDetail);
      this.formGroup.controls["country"].setValue(sponsorDetail.country?.id);
      this.formGroup.controls["website"].setValue(
        sponsorDetail.address?.webSite
      );
      this.sponsorDetailObj = this.formGroup.value;
    }
  }

  onChangeFile(file) {
    this.fileObj = file;
  }

  onSubmit() {
    this.isDisabled = true;
    let formValue = this.formGroup.value;
    const formDataObj = { ...formValue, image: this.fileObj };
    const compareData =
      JSON.stringify(this.sponsorDetailObj) === JSON.stringify(formValue);

    if (compareData && !this.fileObj) {
      console.log("Data is not changed at all, so no need to call API ==>");
      this.router.navigate(["/sponsor-management"]);
      return;
    }
    if (!this.fileObj) {
      delete formDataObj["image"];
    }
    let formData = new FormData();
    Object.keys(formDataObj).forEach((key: string) => {
      let _value = formDataObj[key];
      if (_value) formData.append(`${key}`, formDataObj[key]);
    });
    this.sponsorsService.addEditSponsor(
      formData,
      this.id ? "/" + this.id : "",
      function (data) {
        if (data) this.onSuccessAddEditResponse(data);
      }.bind(this),
      function (err) {
        console.log("err :: while add/edit sponsor ==>", err);
      }.bind(this)
    );
  }

  onSuccessAddEditResponse(data) {
    this.router.navigate(["/sponsor-management"]);
  }

  getCountryList() {
    this.commonService.getCountryList(
      function (data) {
        this.onSuccessResponse(data);
        this.cdr.detectChanges();
      }.bind(this),
      function (err) {
        console.log("err :: while countries listing ==>", err);
      }.bind(this)
    );
  }

  onSuccessResponse(data) {
    this.countryList = data;
  }

  onReset() {
    this.formGroup.reset();
    this.imageSource = "assets/media/users/blank.png";
    if (this.isEdit) {
      this.formGroup.patchValue(this.sponsorDetailObj);
      this.imageSource = `${environment.apiUrl}${this.sponsorDetailObj.image}`;
    }
    this.formGroup.controls["country"].setValue("AFG");
    this.formGroup.controls["status"].setValue("Active");
    this.cdr.detectChanges();
  }
}
