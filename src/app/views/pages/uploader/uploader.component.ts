import { Component, OnInit } from "@angular/core";
import { TranslateService } from "src/app/shared/services/translate.service";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.scss"],
})
export class UploaderComponent implements OnInit {
  isHovering: boolean;
  descriptionFile = "";
  files: File[] = [];
  selectedImage: any = null;
  options: string[] = ["prices", "shoes", "uniform", "defending"];
  pathToBucket = this.options[0];
  constructor(public translate: TranslateService) {}
  ngOnInit() {}

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
}
