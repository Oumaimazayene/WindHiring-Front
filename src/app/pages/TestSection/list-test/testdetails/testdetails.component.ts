import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TestService } from "src/app/service/test-service/test.service";

@Component({
  selector: "app-testdetails",
  templateUrl: "./testdetails.component.html",
  styleUrls: ["./testdetails.component.scss"],
})
export class TestdetailsComponent implements OnInit {
  testId: number;
  test: any;
  constructor(
    private route: ActivatedRoute,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.testId = +params.get("id");
      this.loadTestDetails();
    });
  }

  loadTestDetails() {
    this.testService.getTestById(this.testId).subscribe((data: any) => {
      this.test = data;
    });
  }
}
