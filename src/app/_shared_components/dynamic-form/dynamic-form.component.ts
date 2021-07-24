import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  SimpleChanges,
  ViewChild,
  Renderer2,
  NgZone,
} from "@angular/core";
import { template_ref } from "./fields";

@Component({
  selector: "app-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.scss"],
})
export class DynamicFormComponent implements OnInit {
  @Input() form;
  @Input() key: string;
  @Input() countryData;
  @Input() imageSourceDefault;
  @Output() onChangeFile = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.countryData) {
      this.countryData = changes.countryData.currentValue;
    }
  }

  get fieldObj() {
    return template_ref[this.key];
  }

  get control() {
    return this.form.get(this.key);
  }

  get isInValid() {
    return this.control.invalid && this.control.touched;
  }

  handleFileInput(event) {
    return new Promise((resolve, reject) => {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageSourceDefault = fileReader.result as string;
        resolve(this.imageSourceDefault);
        this.cdr.detectChanges();
      };
      fileReader.readAsDataURL(file);
      this.onChangeFile.emit(file);
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlValid(controlName: string): boolean {
    const control = this.form.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }
}
