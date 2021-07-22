import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { RestApiUrls } from "src/app/_models/rest-api-urls";
import { CommonService } from "src/app/_services/common.service";
import { CrudService } from "src/app/_services/crud.service";
import { generateForm } from "src/app/_shared_components/dynamic-form/form-generate";
import * as formService from "../../../_shared_components/dynamic-form/fields";
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
  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getCountryList();
  }

  ngAfterContentInit() {
    var fieldArray = generateForm(this.form);
    this.formGroup = this.fb.group(fieldArray);
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

    var req = this.crudService.post(RestApiUrls.sponsors.getList, formData);
    req.subscribe(
      (data: any) => {
        if (data) {
          this.router.navigate(['/sponsor-management']);
        }
      },
      (error: any) => {
        if (error) {
          console.log(`error :: while adding sponsor ==>`, error)
        }
      }
    );
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
    this.cdr.detectChanges();
  }
}
