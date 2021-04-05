import { Component, OnInit } from "@angular/core";
import { TranslateService } from "src/app/shared/services/translate.service";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { SymbolService } from "src/app/shared/services/symbol.service";
import { QrService } from "src/app/shared/services/qr.service";
import { ToastrService } from "src/app/shared/services/toastr.service";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.scss"],
})
export class UploaderComponent implements OnInit {
  selectedFile: File;
  nameFile = "";
  isPayment = false;
  isHovering: boolean;
  descriptionFile = "";
  pictureName = "";
  startPrice = 123456;
  files: File[] = [];
  selectedImage: any = null;
  options: string[] = ["prices", "shoes", "uniform", "defending"];
  pathToBucket = this.options[0];
  hasPrivateKey = false;
  isCreatingMosaic = false;
  constructor(
    public translate: TranslateService,
    private symbolService: SymbolService,
    private qrService: QrService,
    private toastrService: ToastrService
  ) {}
  ngOnInit() {
    this.symbolService.hasPrivateKey.subscribe((hasKey) => {
      this.hasPrivateKey = hasKey;
      if (this.hasPrivateKey) {
        this.toastrService.success(
          "Success",
          "The private key added, you can create mosaic"
        );
      }
    });

    this.symbolService.isCreatingMosaic.subscribe((hasMosaic) => {
      this.isCreatingMosaic = hasMosaic;
    });
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    console.log("files :>> ", files);
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  onChange($event) {
    console.log(" event.target[ ] :>> ", $event.target["files"]);
    this.onDrop($event.target["files"]);
    console.log("pathToBucket :>> ", this.pathToBucket);
  }

  showPreview($event) {
    console.log("event.target :>> ", event.target);
    this.selectedImage = event.target["files"][0];
  }

  onFileSelect(event) {
    this.selectedFile = event.target.files[0];
    this.nameFile = this.selectedFile.name;
    this.qrService.readQrFile(this.selectedFile);
  }
}
