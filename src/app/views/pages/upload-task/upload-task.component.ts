import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { FileService } from "src/app/shared/services/file.service";
import { PriceService } from "src/app/shared/services/price.services";
import { Price } from "src/app/shared/models/price";

@Component({
  selector: "app-upload-task",
  templateUrl: "./upload-task.component.html",
  styleUrls: ["./upload-task.component.scss"],
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;
  @Input() pathToBucket: string;
  @Input() descriptionFile: string;
  task: AngularFireUploadTask;
  storage = null;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(
    private fstorage: FileService,
    private db: AngularFirestore,
    private priceService: PriceService
  ) {}

  ngOnInit() {
    console.log(
      "TASK pathToBucket :>> ",
      this.pathToBucket,
      this.descriptionFile,
      this.file
    );
    this.storage = this.fstorage.getStorage();
    this.startUpload();
  }

  startUpload() {
    const priceInfo = {} as Price;
    const path = `${this.pathToBucket}/${Date.now()}_${this.file.name}`;
    priceInfo.category = this.pathToBucket;
    priceInfo.fileName = this.file.name;
    priceInfo.description = this.descriptionFile;
    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file"s download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        priceInfo.urlFile = this.downloadURL;
        this.priceService.createPrice(priceInfo);
        this.db
          .collection("files")
          .add({ downloadURL: this.downloadURL, path });
      })
    );
  }

  isActive(snapshot) {
    return (
      snapshot.state === "running" &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
