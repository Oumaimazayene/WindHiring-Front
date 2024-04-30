import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/service/auth.service";
import { UserService } from "../../service/user-service/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginError: string | null = null; // Propriété pour contenir le message d'erreur de connexion

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  async login() {
    if (this.form.valid) {
      try {
        const { email, password } = this.form.value;
        const response = await this.authService
          .login({ email, password })
          .toPromise();

        if (response && response.token) {
          // Succès de la connexion
          localStorage.setItem("token", response.token);

          const uuid = this.authService.extractUUIDFromToken();
          this.userservice.getUserByUUID(uuid).subscribe(
            (user) => {
              console.log(user);
            },
            (error) => {
              console.error(
                "Erreur lors de la récupération des données de l'utilisateur :",
                error
              );
            }
          );
          this.router.navigate(["/dashboard"]);
          this.toastr.success("Connexion réussie !", "Succès");
        } else {
          this.loginError = "Adresse e-mail ou mot de passe incorrect.";
          this.toastr.error(
            "Adresse e-mail ou mot de passe incorrect.",
            "Erreur de connexion"
          );
        }
      } catch (error) {
        this.loginError = "Erreur lors de la connexion.";
        this.toastr.error("Erreur lors de la connexion.", "Erreur");
      }
    } else {
      this.loginError = "Veuillez remplir tous les champs correctement.";
      this.toastr.error(
        "Veuillez remplir tous les champs correctement.",
        "Erreur de formulaire"
      );
    }
  }
}
