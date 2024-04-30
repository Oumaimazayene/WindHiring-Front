import { Component, OnInit } from "@angular/core";
import { Domaine } from "src/app/Models/domaine";
import { DomainsService } from "src/app/service/domain-service/domains.service";
import { MatDialog } from "@angular/material/dialog";
import { DeleteConfirmationDialogComponent } from "./delete-confirmation-dialog/delete-confirmation-dialog.component";
import { AjoutConfirmationDialogComponent } from "./ajout-confirmation-dialog/ajout-confirmation-dialog.component";
import { UpdateConfirmationDialogComponent } from "./update-confirmation-dialog/update-confirmation-dialog.component";

@Component({
  selector: "app-domains",
  templateUrl: "./domains.component.html",
  styleUrls: ["./domains.component.scss"],
})
export class DomainsComponent implements OnInit {
  domaines: Domaine[];
  newDomaine: Domaine = {
    name: "",
    version: "",
    lang: "",
  };
  domaineToEdit: Domaine;
  showAddCard: boolean = false;
  showUpdateCard: boolean = false;
  showDeleteConfirmation: boolean = false;
  domainIdToDelete: number;
  constructor(
    private domaineService: DomainsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllDomaines();
  }

  getAllDomaines() {
    this.domaineService.getAllDomaines().subscribe((domaines) => {
      this.domaines = domaines;
    });
  }
  openAddDomainDialog(): void {
    const dialogRef = this.dialog.open(AjoutConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((newDomaine: Domaine) => {
      if (newDomaine) {
        // Si un nouveau domaine est ajouté, envoyez-le au service pour l'ajouter
        this.addDomaine(newDomaine);
      }
    });
  }

  addDomaine(newDomaine: Domaine): void {
    this.domaineService.addDomaine(newDomaine).subscribe(() => {
      this.getAllDomaines(); // Mettez à jour la liste des domaines après l'ajout
    });
  }

  resetNewDomaine() {
    this.newDomaine = {
      name: "",
      version: "",
      lang: "",
    };
  }

  openDeleteConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteDomaine(id);
      } else {
        console.log("Suppression annulée");
      }
    });
  }

  deleteDomaine(id: number) {
    this.domaineService.deleteDomaine(id).subscribe(() => {
      this.getAllDomaines();
    });
  }
  // Dans votre composant TypeScript
  closeDeleteConfirmationModal(): void {
    this.showDeleteConfirmation = false;
  }

  confirmDeleteDomaine() {
    // Supprimer le domaine avec l'ID `domainIdToDelete`
    this.domaineService.deleteDomaine(this.domainIdToDelete).subscribe(() => {
      this.getAllDomaines();
      this.closeDeleteConfirmationModal();
    });
  }

  editDomaine(domaine: Domaine) {
    this.showUpdateCard = true;

    this.domaineToEdit = { ...domaine };
  }
  openUpdateDialog(domaine: Domaine): void {
    const dialogRef = this.dialog.open(UpdateConfirmationDialogComponent, {
      data: domaine,
    });
    dialogRef.afterClosed().subscribe((result: Domaine) => {
      console.log("Dialog closed with result:", result);
      if (result) {
        this.updateDomaine(result);
      }
    });
  }

  updateDomaine(domaineToUpdate: Domaine) {
    this.domaineService
      .updateDomaine(domaineToUpdate.id, domaineToUpdate)
      .subscribe(() => {
        this.getAllDomaines();
        this.showUpdateCard = false;
      });
  }
}
