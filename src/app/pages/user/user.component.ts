import { Component, OnInit } from "@angular/core";
import { UserService } from "../../service/user-service/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  users: any[] = [];
  notValidUsers: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        console.log(data);
      },
      (error) => {
        console.error(
          "Une erreur est survenue lors de la récupération des utilisateurs :",
          error
        );
      }
    );
  }
  getAllValidUsers(): void {
    this.userService.getAllValidUsers().subscribe(
      (data: any[]) => {
        this.users = data;
        console.log(data);
      },
      (error) => {
        console.error(
          "Une erreur est survenue lors de la récupération des utilisateurs :",
          error
        );
      }
    );
  }

  getAllNotValidUsers(): void {
    this.userService.getAllNotValidUsers().subscribe(
      (data: any[]) => {
        this.notValidUsers = data;
        console.log(data);
      },
      (error) => {
        console.error(
          "Une erreur est survenue lors de la récupération des utilisateurs :",
          error
        );
      }
    );
  }

  validateUser(userId: number): void {
    this.userService.validateUser(userId).subscribe(
      (response) => {
        console.log("Validation réussie :", response);
        this.getAllNotValidUsers();
      },
      (error) => {
        console.error("Erreur lors de la validation de l'utilisateur :", error);
      }
    );
  }
}
