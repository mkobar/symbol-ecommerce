import { Injectable } from "@angular/core";
import QrCode from "qrcode-reader";
import jsQR from "jsqr";
import { BehaviorSubject, of } from "rxjs";
import { mergeMap, delay, takeUntil } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class QrService {
  privateKey = new BehaviorSubject("");
  pathToQrFile = localStorage.getItem("qrFilePath");
  qr = null;

  constructor() {
    this.qr = new QrCode();
    this.getKey(this.pathToQrFile);
    localStorage.setItem("qrFilePath", "src/assets/img/address-qr-test1.png");
  }

  getKey(pathToFile) {
    //     const self = this;
    //  if(pathToFile !== null) {
    //   //let blob = new Blob( file.arrayBuffer());
    //   fetch(pathToFile)
    //   .then(function(response) {
    //     return response.blob()
    //   })
    //   .then(function(blob) {
    //       let reader = new FileReader();
    //       reader.readAsArrayBuffer(blob);
    //       reader.onload = function() {
    //         console.log("&&&", reader.result);
    //         self.qr.callback = function(err, value) {
    //           if (err) {
    //               console.error(err);
    //               // TODO handle error
    //           }
    //           console.log(value.result);
    //           console.log(value);
    //           this.privateKey.next(value.result);
    //       };
    //       const resKey = self.qr.decode(reader.result);
    //       console.log("🚀 ~ file: qr.service.ts ~ line 43 ~ QrService ~ .then ~ resKey", resKey);
    //   };
    //   reader.onerror = function() {
    //     console.log(reader.error);
    //   };
    //  })
    //  } else {
    //     // this.pathToQrFile = localStorage.getItem('qrFilePath');
    //     // this.getKey(this.pathToQrFile);
    //    }
  }

  readQrFile(file) {
    console.log(
      "🚀 ~ file: qr.service.ts ~ line 64 ~ QrService ~ readQrFile ~ file",
      file
    );
    // if (!file.type.match('image.*')) {
    //   continue;
    // }
    // const self = this;
    // var reader = new FileReader();
    // reader.readAsArrayBuffer(file);
    // reader.onload = function() {
    //           console.log("&&&", reader.result);
    //           self.qr.callback = function(err, value) {
    //             if (err) {
    //                 console.error(err);
    //                 // TODO handle error
    //             }
    //             console.log(value.result);
    //             console.log(value);
    //             this.privateKey.next(value.result);
    //         };
    //         const resKey = self.qr.decode(reader.result);
    //         console.log("🚀 ~ file: qr.service.ts ~ line 43 ~ QrService ~ .then ~ resKey", resKey);
    //     };

    //     reader.onerror = function() {
    //       console.log(reader.error);
    //     };

    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = (event: ProgressEvent) => {
      const img: HTMLImageElement = new Image();
      img.onload = () => {
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        const width: number = img.width;
        const height: number = img.height;

        canvas.width = width;
        canvas.height = height;

        const canvasRenderingContext: CanvasRenderingContext2D = canvas.getContext(
          "2d"
        );
        console.log(canvasRenderingContext);

        canvasRenderingContext.drawImage(img, 0, 0);

        const qrCodeImageFormat: ImageData = canvasRenderingContext.getImageData(
          0,
          0,
          width,
          height
        );

        const qrDecoded = jsQR(
          qrCodeImageFormat.data,
          qrCodeImageFormat.width,
          qrCodeImageFormat.height
        );

        this.privateKey.next(JSON.parse(qrDecoded.data).data.privateKey);
        canvas.remove();
      };
      img.onerror = () => console.error("Upload file of image format please.");
      img.src = (<any>event.target).result;
    };
  }
}
