import { Component, OnInit } from "@angular/core";
import { User } from "../../Models/user";
import { UserService } from "src/app/service/user-service/user.service";
import { AuthService } from "src/app/service/auth.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  user: any;
  userUpdate: User = {
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    societyName: "",
    logo: "",
    matricule_fiscale: "",
    numtel: "",
  };
  userId: number = 0;
  logoImage: string | ArrayBuffer | null = null;
  showEditProfile: boolean = false;
  logoFile: File;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getUserByUUID();
  }

  getUserByUUID(): void {
    const uuid = this.authService.extractUUIDFromToken();

    if (uuid) {
      this.userService.getUserByUUID(uuid).subscribe(
        (user) => {
          if (user) {
            this.user = user;
            this.userId = user.id;
            this.getImage(this.user.logo);
            this.getImage(this.user.profileImg);
            console.log("user", user);
          } else {
            console.error("L'utilisateur n'a pas été trouvé.");
          }
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération des données de l'utilisateur :",
            error
          );
        }
      );
    } else {
      console.error("Impossible de récupérer l'UUID à partir du token JWT.");
    }
  }

  onLogoFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.logoFile = files[0]; // Mettre à jour logoFile
      const reader = new FileReader();
      reader.onload = (e) => {
        this.logoImage = reader.result;
      };
      reader.readAsDataURL(this.logoFile);
    }
  }

  updateUser(): void {
    if (!this.userId) {
      console.error("L'ID de l'utilisateur est manquant.");
      return;
    }

    const formData = new FormData();
    formData.append("dtouserjson", JSON.stringify(this.userUpdate));
    console.log("aaaaa", this.userUpdate);
    formData.append("logoFile", this.logoFile);
    this.userService.updateUser(this.userId, formData).subscribe(
      (updatedUser) => {
        console.log("Utilisateur mis à jour avec succès :", updatedUser);
        this.getUserByUUID();
      },
      (error) => {
        console.error(
          "Erreur lors de la mise à jour de l'utilisateur :",
          error
        );
      }
    );
  }

  toggleShowEdit() {
    this.showEditProfile = !this.showEditProfile;
  }

  getImage(imageName: string): Observable<Blob> {
    return this.http.get(`http://localhost:8090/image/${imageName}`, {
      responseType: "blob",
    });
  }
}
