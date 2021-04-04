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
import { SymbolService } from "src/app/shared/services/symbol.service";
import { ProductService } from "src/app/shared/services/product.service";
import { Product } from "src/app/shared/models/product";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { Router } from "@angular/router";
import { Bit } from "src/app/shared/models/bit";

@Component({
  selector: "app-upload-task",
  templateUrl: "./upload-task.component.html",
  styleUrls: ["./upload-task.component.scss"],
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;
  @Input() pathToBucket: string;
  @Input() descriptionFile: string;
  @Input() pictureName: string;
  @Input() startPrice: number;
  task: AngularFireUploadTask;
  storage = null;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  hasPrivateKey = false;
  constructor(
    private fstorage: FileService,
    private db: AngularFirestore,
    private priceService: PriceService,
    private productService: ProductService,
    private symbolService: SymbolService,
    private toastrService: ToastrService,
    // private qrService: QrService,
    private router: Router
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
    this.symbolService.hasPrivateKey.subscribe((hasKey) => {
      this.hasPrivateKey = hasKey;
      if (this.hasPrivateKey) {
        // this.toastrService.success('Success', 'The bill was signed by the private key, you can do payment now');
      }
    });
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
        console.log(
          "🚀 ~ file: upload-task.component.ts ~ line 67 ~ UploadTaskComponent ~ finalize ~ this.downloadURL",
          this.downloadURL
        );
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

  createApostille() {
    this.symbolService.createApostille();
  }
  createMosaic() {
    this.symbolService.createMosaic("test1", this.downloadURL).then(() => {
      this.symbolService.confirmedHash.subscribe((hash) => {
        console.log(
          "🚀 ~ file: result.component.ts ~ line 85 ~ ResultComponent ~ .then ~ hash",
          hash
        );

        if (hash !== "") {
          //this.products.map(prod => prod.$key = "qqwer")
          const newNft = new Product();
          newNft.productId = 1;
          newNft.productImageUrl = this.downloadURL;
          newNft.productPrice = this.startPrice;
          newNft.productName = this.pictureName;
          newNft.productQuatity = 1;
          newNft.productSeller = "Picasso";
          newNft.productCategory = "nft";
          newNft.productDescription = this.descriptionFile;
          const bit = new Bit();
          bit.addressBuyer = "KJHJKHKJH";
          bit.hash = "KJHHYTTTYUUIOIPUIOPUIOP";
          bit.rate = 14789654;
          newNft.bits = [];
          newNft.bits.push(bit);
          this.productService.createProduct(newNft);
          this.toastrService.success(`New nft added ${hash}`, hash);
          this.router.navigate(["/"]);
        }
      });
    });
  }
}
