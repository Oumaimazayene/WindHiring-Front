import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Domaine } from "src/app/Models/domaine";
import { NgForm } from "@angular/forms"; // Importez NgForm pour travailler avec les formulaires

@Component({
  selector: "app-ajout-confirmation-dialog",
  templateUrl: "./ajout-confirmation-dialog.component.html",
  styleUrls: ["./ajout-confirmation-dialog.component.scss"],
})
export class AjoutConfirmationDialogComponent implements OnInit {
  newDomaine: Domaine = {
    name: "",
    version: "",
    lang: "",
  };

  constructor(
    private dialogRef: MatDialogRef<AjoutConfirmationDialogComponent>
  ) {}

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  addDomaine(domainForm: NgForm): void {
    if (domainForm.valid) {
     
      this.dialogRef.close(this.newDomaine);
    } else {
    }
  }
}
