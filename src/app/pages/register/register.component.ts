import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      numtel: ["", Validators.required],
      societyName: ["", Validators.required],
      matricule_fiscale: ["", Validators.required],
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach((field) => {
        const control = this.registerForm.get(field);
        if (control.invalid && control.errors?.required) {
          control.markAsTouched();
        }
      });
      this.toastr.error(
        "Veuillez remplir tous les champs.",
        "Erreur de formulaire"
      );
      return;
    }
    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        this.toastr.success("Inscription réussie !", "Succès");
        this.router.navigate(["/Home"]);
      },
      (error) => {
        this.toastr.error("Erreur lors de l'inscription.", "Erreur");
      }
    );
  }
}
