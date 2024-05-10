import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TestService } from "src/app/service/test-service/test.service";

@Component({
  selector: "app-add-test-tech",
  templateUrl: "./add-test-tech.component.html",
  styleUrls: ["./add-test-tech.component.scss"],
})
export class AddTestTechComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddTestTechComponent>,
    private testService: TestService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
  closeDialog(): void {
    this.dialogRef.close();
  }

  addTestTech(): void {
    const testSectionTechId = this.data.testSectionTechUUID;

    this.testService.createTestTechnique(testSectionTechId).subscribe(
      (response) => {
        console.log("Test technique créé avec succès avec l'ID:", response.id);
        this.dialogRef.close();
      },
      (error) => {
        console.error("Erreur lors de la création du test technique:", error);
      }
    );
  }
}
