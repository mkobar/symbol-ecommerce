import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { FileService } from "src/app/shared/services/file.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { TranslateService } from "src/app/shared/services/translate.service";

@Component({
  selector: "app-nft",
  templateUrl: "./nft.component.html",
  styleUrls: ["./nft.component.scss"],
})
export class NftComponent implements OnInit {
  fileUploads = null;

  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    public translate: TranslateService,
    private fileService: FileService
  ) {}

  ngOnInit() {}
}
