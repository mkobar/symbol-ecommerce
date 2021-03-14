import { Component, OnInit, Inject } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { TranslateService } from "src/app/shared/services/translate.service";
import { FileService } from "src/app/shared/services/file.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-prices",
  templateUrl: "./prices.component.html",
  styleUrls: ["./prices.component.scss"],
})
export class PricesComponent implements OnInit {
  fileUploads = null;

  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    public translate: TranslateService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    // //this.fileUploads = this.fileService.getFilesFromBucket("test");
    // .pipe(
    //   map(changes => {
    //     console.log('changes :>> ', changes);
    //     return changes.map(c => {
    //       console.log('c :>> ', c);
    //       return c; // ({ key: c.payload.key, value: c.payload.val() });
    //     });}
    //   )
    // ).subscribe(fileUploads => {
    //   console.log('fileUploads :>> ', fileUploads);
    //   this.fileUploads = fileUploads;
    // });
    // console.log('this.fileUploads :>> ', this.fileUploads);
  }
}
