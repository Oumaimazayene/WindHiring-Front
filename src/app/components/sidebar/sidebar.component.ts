import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

interface ChildRouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

interface RouteInfo {
  path?: string;
  title: string;
  expanded?: boolean;
  icon: string;
  children?: ChildRouteInfo[];
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Accueil",
    icon: "ni-tv-2 text-yellow",
    class: "",
  },
  {
    path: "/user-profile",
    title: "Profil utilisateur",
    icon: "ni-single-02 text-yellow",
    class: "",
  },
  {
    path: "/liste-des-utilisateurs",
    title: "Liste des utilisateurs",
    icon: "ni-bullet-list-67 text-yellow",
    class: "",
  },
  {
    path: "/liste-des-domaines",
    title: "Liste des domaines",
    icon: "ni ni-world text-yellow",
    class: "",
  },
  {
    path: "",
    title: "Liste des questions",
    icon: "ni ni-ungroup text-yellow",
    class: "",
    expanded: false,

    children: [
      {
        path: "/questions-techniques",
        title: "Questions Techniques",
        icon: "point",
        class: "",
      },
      {
        path: "/questions-logiques",
        title: "Questions Logiques",
        icon: "point",
        class: "",
      },
    ],
  },
  {
    path: "",
    title: "Sections des Tests",
    icon: "ni ni-ungroup text-yellow",
    class: "",
    expanded: false,

    children: [
      {
        path: "/testSection-Logique",
        title: "Section des tests Logiques",
        icon: "point",
        class: "",
      },
      {
        path: "/testSection-Technique",
        title: "Section des tests Techniques",
        icon: "point",
        class: "",
      },
    ],
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: RouteInfo[];
  public isCollapsed = true;
  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  toggleDropdown(menuItem: RouteInfo) {
    menuItem.expanded = !menuItem.expanded;
  }
}
