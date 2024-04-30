import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TestService } from "src/app/service/test-service/test.service";

@Component({
  selector: "app-add-test-logique",
  templateUrl: "./add-test-logique.component.html",
  styleUrls: ["./add-test-logique.component.scss"],
})
export class AddTestLogiqueComponent implements OnInit {
  newTestLogForm: FormGroup;
  testSectionUUID: string;

  constructor(
    private dialogRef: MatDialogRef<AddTestLogiqueComponent>,
    private formBuilder: FormBuilder,
    private testService: TestService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.testSectionUUID = data.testSectionUUID;
  }

  ngOnInit(): void {
    this.newTestLogForm = this.formBuilder.group({
      size: ["", [Validators.required, Validators.min(0)]],
      privateqts: ["", [Validators.required, Validators.min(0)]],
    });
    console.log("testUUId", this.testSectionUUID);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.newTestLogForm.valid) {
      const { size, privateqts } = this.newTestLogForm.value;
      this.testService
        .createTestLog(this.testSectionUUID, size, privateqts)
        .subscribe(
          (data) => {
            console.log("Test logique créé :", data);
            this.dialogRef.close();
          },
          (error) => {
            console.error(
              "Erreur lors de la création du test logique :",
              error
            );
          }
        );
    } else {
      console.log("Veuillez remplir tous les champs correctement.");
    }
  }
}
