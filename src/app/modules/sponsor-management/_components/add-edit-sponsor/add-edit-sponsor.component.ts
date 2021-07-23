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
  countryList: any = [];
  fileObj: any = {};
  imageSource: string;
  editImageSource: string;
  public formGroup: FormGroup;
  public form = formService.segment["sponsorForm"].fields;
  isEdit: boolean = false;
  private subscriptions: Subscription[] = [];
  sponsorDetail: any;
  id: string;
  public title: string = "New Record";

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private sponsorsService: SponsorsService
  ) { }

  ngOnInit(): void {
    this.getCountryList();
    const sb = this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
        this.isEdit = true;
        this.title = "Edit Record";
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
    this.sponsorDetail = this.activatedRoute.snapshot.data.sponsorDetail;
    if (this.sponsorDetail) {
      this.editImageSource = `${environment.apiUrl}${this.sponsorDetail.image}`
      this.formGroup.patchValue(this.sponsorDetail);
      this.formGroup.controls["country"].setValue(this.sponsorDetail.country?.id);
      this.formGroup.controls["website"].setValue(this.sponsorDetail.address?.webSite);
      this.formGroup.controls["image"].setValue(this.editImageSource);
    }
  }

  onChangeFile(file) {
    this.fileObj = file;
    this.formGroup.controls["image"].setValue(file ? file.name : "");
  }

  onSubmit() {
    let formValue = this.formGroup.value;
    const formDataObj = { ...formValue, image: this.fileObj };
    let formData = new FormData();
    if (Object.keys(this.fileObj).length === 0) {
      delete formDataObj['image']
    }
    Object.keys(formDataObj).forEach((key: string) => {
      let _value = formDataObj[key];
      if (key === "country" && _value)
        formData.append("address.country", formDataObj[key]);
      else if (key === "website" && _value)
        formData.append("address.website", formDataObj[key]);
      else if (_value) formData.append(`${key}`, formDataObj[key]);
    });
    this.sponsorsService.addEditSponsor(
      formData,
      this.id ? "/" + this.id : "",
      function (data) {
        this.onSuccessAddEditResponse(data);
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
    this.formGroup.controls["country"].setValue("AFG");
    this.formGroup.controls["status"].setValue("Active");
    this.imageSource = "assets/media/users/blank.png";
    if (this.isEdit) {
      this.formGroup.patchValue(this.sponsorDetail);
    }
    this.cdr.detectChanges();
  }
}
