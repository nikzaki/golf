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
  @Input() editImageSource;
  @Output() onChangeFile = new EventEmitter<any>();
  imageSource: string = "assets/media/users/blank.png";

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.countryData) {
      this.countryData = changes.countryData.currentValue;
    }
    if (changes.imageSourceDefault) {
      this.imageSource = changes.imageSourceDefault.currentValue;
      this.cdr.detectChanges();
    }
    // if (changes.editImageSource) {
    //   console.log('changes.editImageSource', changes.editImageSource);
    //   this.imageSource = changes.editImageSource.currentValue;
    //   this.cdr.detectChanges();
    // }
  }
  // ngDoCheck(): void {
  //   //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //   //Add 'implements DoCheck' to the class.
  //   if (this.editImageSource != undefined) {
  //     this.imageSource = this.editImageSource;
  //     console.log('ngDoCheck=======>>>>>', this.imageSource);

  //     this.cdr.detectChanges();
  //   }
  // }

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
        this.imageSource = fileReader.result as string;
        resolve(this.imageSource);
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
