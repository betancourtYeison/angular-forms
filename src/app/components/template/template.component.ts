import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-template",
  templateUrl: "./template.component.html",
  styles: [
    `
      .ng-invalid.ng-touched:not(form) {
        border: 1px solid red !important;
      }
    `
  ]
})
export class TemplateComponent {
  user: Object = {
    name: null,
    lastName: null,
    email: null,
    country: "",
    sex: "Hombre",
    agree: false
  };

  countries = [
    { code: "CRI", name: "Costa Rica" },
    { code: "ESP", name: "España" },
    { code: "COL", name: "Colombia" }
  ];

  sexs: string[] = ["Hombre", "Mujer", "Sin definir"];

  constructor() {}

  save(formTemplate: NgForm) {
    console.log("formTemplate", formTemplate);
    console.log("formTemplate.value", formTemplate.value);
    console.log("user", this.user);
    formTemplate.reset();
  }
}
