import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-data",
  templateUrl: "./data.component.html",
  styles: []
})
export class DataComponent {
  formData: FormGroup;

  user: Object = {
    fullName: {
      name: "Yeison",
      lastName: "Betamcourt Solis"
    },
    email: "yeisonbe10@hotmail.com",
    hobbies: ["Corre", "Dormir", "Ver TV"]
  };

  constructor() {
    this.formData = new FormGroup({
      fullName: new FormGroup({
        name: new FormControl("", [
          Validators.required,
          Validators.minLength(5)
        ]),
        lastName: new FormControl("", [Validators.required, this.noLastName])
      }),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]),
      hobbies: new FormArray([
        new FormControl("Ver Netflix", Validators.required)
      ]),
      username: new FormControl("", Validators.required, this.existsUsername),
      password1: new FormControl("", Validators.required),
      password2: new FormControl("")

      // name: new FormControl("", [Validators.required, Validators.minLength(5)]),
      // lastName: new FormControl("", Validators.required),
      // email: new FormControl("", [
      //   Validators.required,
      //   Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      // ])
    });

    // this.formData.setValue(this.user);
    this.formData.controls["password2"].setValidators([
      Validators.required,
      this.passwordInvalid.bind(this)
    ]);

    // this.formData.valueChanges.subscribe(data => {
    //   console.log("data", data);
    // });

    // this.formData.controls["username"].valueChanges.subscribe(data => {
    //   console.log("data", data);
    // });

    // this.formData.controls["username"].statusChanges.subscribe(data => {
    //   console.log("data", data);
    // });
  }

  addHobby() {
    console.log("addHobby");
    (<FormArray>this.formData.controls["hobbies"]).push(
      new FormControl("", Validators.required)
    );
  }

  noLastName(control: FormControl): { [s: string]: boolean } {
    if (control.value === "Apellido") {
      return {
        noLastName: true
      };
    }
    return null;
  }

  passwordInvalid(control: FormControl): { [s: string]: boolean } {
    if (control.value !== this.formData.controls["password1"].value) {
      return {
        passwordInvalid: true
      };
    }
    return null;
  }

  existsUsername(control: FormControl): Promise<any> | Observable<any> {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "mochi") {
          resolve({
            existsUsername: true
          });
        } else {
          resolve(null);
        }
      }, 3000);
    });
    return promise;
  }

  save() {
    console.log("this.formData", this.formData);
    console.log("this.formData.value", this.formData.value);
    this.formData.reset();
  }
}
