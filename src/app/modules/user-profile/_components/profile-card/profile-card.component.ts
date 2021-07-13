import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../../auth";
import { UserModel } from "../../../../_models/user.model";

@Component({
  selector: "app-profile-card",
  templateUrl: "./profile-card.component.html",
  styleUrls: ["./profile-card.component.scss"],
})
export class ProfileCardComponent {
  user$: Observable<UserModel>;
  constructor(public userService: AuthService) {
    this.user$ = this.userService.currentUserSubject.asObservable();
  }
}
