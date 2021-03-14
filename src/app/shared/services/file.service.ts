import { Injectable, Inject } from "@angular/core";
import {
  AngularFireList,
  AngularFireDatabase,
  SnapshotAction,
} from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from "@angular/fire/storage";

@Injectable({
  providedIn: "root",
})
export class FileService {
  imageDetailList: AngularFireList<any>;
  fileList: any[];
  dataSet: Data = {
    id: "",
    url: "",
  };
  msg = "error";
  task: AngularFireUploadTask;
  constructor(
    // @Inject(AngularFireDatabase) private firebase: AngularFireDatabase,
    private db: AngularFirestore,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {}

  getStorage() {
    return this.storage;
  }
  getImageDetailList() {
    // this.imageDetailList = this.firebase.list("test");
  }
  insertImageDetails(id, url) {
    this.dataSet = {
      id: id,
      url: url,
    };
    this.imageDetailList.push(this.dataSet);
  }

  getFilesFromBucket(bucketName: string) {
    // this.db.firestore.collection('test').get().then(
    //   t => console.log('t :>> ', t)
    // )
    const path = bucketName;
    const t = this.storage
      .ref("test/")
      .listAll()
      .subscribe((r) => console.log("r :>> ", r));
    console.log("t :>> ", t);
    // Reference to storage bucket
    //     const ref = this.storage.firestore.collection(path).get()
    //     .then(r => console.log('r :>> ', r))
    //     // .subscribe( t => console.log('test :>> ', t));
    // console.log('ref :>> ', ref);

    // The main task
    //   const r = this.storage.storage.ref(ref);

    //   // Progress monitoring
    // return  r.listAll()
    //   .then(file => console.log('file :>> ', file));

    // this.snapshot = this.task.snapshotChanges().pipe(
    //   tap(console.log),
    //   // The file"s download URL
    //   finalize(async () => {
    //     this.downloadURL = await ref.getDownloadURL().toPromise();

    //     this.db
    //       .collection("files")
    //       .add({ downloadURL: this.downloadURL, path });
    //   })
    // );
    // return this.store.collection(bucketName).valueChanges()
    // return this.firebase.list(bucketName).valueChanges();
    //  return this.firebase.list("bucketName").snapshotChanges().subscribe((list) => {
    //    console.log('list :>> ', list);
    //     this.fileList = list.map((item) => {
    //       return item.payload.val();
    //     });
    //     console.log('this.fileList:>> ', this.fileList);

    //   });
    // return this.firebase.list(bucketName).query((list) => {
    //   if(list ) {
    //     return list;
    //   }

    // });
    // return this.firebase.object(bucketName);
    // return this.firebase.list(bucketName, (ref) => {
    //   console.log("ref :>> ", ref);
    //   return ref.limitToLast(3);
    // });
  }
  getImage(value) {
    this.imageDetailList.snapshotChanges().subscribe((list) => {
      this.fileList = list.map((item) => {
        return item.payload.val();
      });
      this.fileList.forEach((element) => {
        if (element.id === value) this.msg = element.url;
      });
      if (this.msg === "error") alert("No record found");
      else {
        // window.open(this.msg);
        this.msg = "error";
      }
    });
  }
}
export interface Data {
  id: string;
  url: string;
}
