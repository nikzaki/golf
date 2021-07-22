import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { RestApiUrls } from "src/app/_models/rest-api-urls";
import { CommonService } from "src/app/_services/common.service";
import { CrudService } from "src/app/_services/crud.service";
import { generateForm } from "src/app/_shared_components/dynamic-form/form-generate";
import * as formService from "../../../../_shared_components/dynamic-form/fields";
import { SponsorsService } from "../../_services/sponsors.service";
@Component({
  selector: "app-add-edit-sponsor",
  templateUrl: "./add-edit-sponsor.component.html",
  styleUrls: ["./add-edit-sponsor.component.scss"],
})
export class AddEditSponsorComponent implements OnInit, AfterContentInit {
  countryList: any = [];
  fileObj: any = {};
  imageSource: string;
  public formGroup: FormGroup;
  public form = formService.segment["sponsorForm"].fields;
  isEdit: boolean = false;
  private subscriptions: Subscription[] = [];
  sponsorDetail: any;
  id: string;
  public title: string = 'New Record';

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
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
        this.title = 'Edit Record'
      }
    });
    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  ngAfterContentInit() {
    var fieldArray = generateForm(this.form);
    this.formGroup = this.fb.group(fieldArray);
    this.sponsorDetail = this.activatedRoute.snapshot.data.sponsorDetail;
    if (this.sponsorDetail) {
      this.formGroup.patchValue(this.sponsorDetail);
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
    Object.keys(formDataObj).forEach((key: string) => {
      formData.append(`${key}`, formDataObj[key]);
    });
    this.sponsorsService.addEditSponsor(
      formData,
      this.id ?  '/' + this.id : '',
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
        console.log("err :: while sponsors listing ==>", err);
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
