import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  Account,
  AccountService,
  AggregateTransaction,
  AggregateTransactionService,
  CosignatureSignedTransaction,
  CosignatureTransaction,
  Deadline,
  LockFundsTransaction,
  Mosaic,
  MosaicId,
  NetworkCurrencies,
  NetworkType,
  PlainMessage,
  PublicAccount,
  NetworkRepository,
  RepositoryFactoryHttp,
  TransactionMapping,
  TransactionService,
  TransferTransaction,
  Address,
  UInt64,
  MosaicNonce,
  MosaicDefinitionTransaction,
  MosaicFlags,
  MosaicSupplyChangeAction,
  MosaicSupplyChangeTransaction,
  SignedTransaction,
} from "symbol-sdk";
import { BehaviorSubject, of } from "rxjs";
import { mergeMap, delay, takeUntil } from "rxjs/operators";
import { QrService } from "./qr.service";
@Injectable({
  providedIn: "root",
})
export class SymbolService {
  symbolBalance = new BehaviorSubject(123);
  confirmedHash = new BehaviorSubject("");
  messageFromTransaction = new BehaviorSubject("");
  isCreatingMosaic = new BehaviorSubject(false);
  hasPrivateKey = new BehaviorSubject(false);
  networkType = NetworkType.TEST_NET;
  epochAdjustment = 1573430400;
  accountService = null;
  networkGenerationHash =
    "45FBCF2F0EA36EFA7923C9BC923D6503169651F7FA4EFC46A8EAF5AE09057EBD";
  rawAddress = "TDLEYX-HXPTRG-DJA2TM-6JD2CR-2NS6QT-ZRKAGM-POI ";
  sellerAddress = Address.createFromRawAddress(this.rawAddress);
  nodeUrl = "http://api-01.us-east-1.testnet.symboldev.network:3000";
  repositoryFactory = new RepositoryFactoryHttp(this.nodeUrl);
  transactionRepository = this.repositoryFactory.createTransactionRepository();
  accountHttp = this.repositoryFactory.createAccountRepository();
  userPrivateKey = "";
  fileContent = null;
  connector = null;
  common = null;
  endpointWs = null;
  txHash = null;
  endpoint = null;
  // apostille: Apostille = null;
  constructor(private httpClient: HttpClient, private qrService: QrService) {
    this.accountService = new AccountService(this.repositoryFactory);
    this.getBalance();
    this.qrService.privateKey.subscribe((key) => {
      this.userPrivateKey = key;
      this.hasPrivateKey.next(!!this.userPrivateKey.length);
    });
  }

  async createMosaic(nameMosaic, pathTofile) {
    console.log(
      "🚀 ~ file: symbol.service.ts ~ line 82 ~ SymbolService ~ createMosaic ~ nameMosaic",
      nameMosaic
    );
    console.log(
      "🚀 ~ file: symbol.service.ts ~ line 82 ~ SymbolService ~ createMosaic ~ pathTofile",
      pathTofile
    );
    // replace with network type
    const networkType = NetworkType.TEST_NET;
    // replace with private key
    // const privateKey =
    //   "F5073B7119B619EBDF08DDCF541C985DDC5ACE074EDF91FE09B0C429CFA9AD48";
    const account = Account.createFromPrivateKey(
      this.userPrivateKey,
      networkType
    );
    // replace with duration (in blocks)
    const duration = UInt64.fromUint(10000);
    // replace with custom mosaic flags
    const isSupplyMutable = true;
    const isTransferable = true;
    const isRestrictable = true;
    // replace with custom divisibility
    const divisibility = 0;

    const nonce = MosaicNonce.createRandom();
    const mosaicDefinitionTransaction = MosaicDefinitionTransaction.create(
      Deadline.create(this.epochAdjustment),
      nonce,
      MosaicId.createFromNonce(nonce, account.address),
      MosaicFlags.create(isSupplyMutable, isTransferable, isRestrictable),
      divisibility,
      duration,
      networkType
    );
    const delta = 1;

    const mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
      Deadline.create(this.epochAdjustment),
      mosaicDefinitionTransaction.mosaicId,
      MosaicSupplyChangeAction.Increase,
      UInt64.fromUint(delta * Math.pow(10, divisibility)),
      networkType
    );
    const aggregateTransaction = AggregateTransaction.createComplete(
      Deadline.create(this.epochAdjustment),
      [
        mosaicDefinitionTransaction.toAggregate(account.publicAccount),
        mosaicSupplyChangeTransaction.toAggregate(account.publicAccount),
      ],
      networkType,
      [],
      UInt64.fromUint(2000000)
    );

    // replace with meta.networkGenerationHash (nodeUrl + '/node/info')
    // const networkGenerationHash =
    //   '1DFB2FAA9E7F054168B0C5FCB84F4DEB62CC2B4D317D861F3168D161F54EA78B';
    const signedTransaction = account.sign(
      aggregateTransaction,
      this.networkGenerationHash
    );
    console.log(
      "🚀 ~ file: symbol.service.ts ~ line 144 ~ SymbolService ~ createMosaic ~ signedTransaction",
      signedTransaction.hash
    );
    // replace with node endpoint
    // const nodeUrl = 'http://api-01.us-east-1.testnet.symboldev.network:3000';
    // const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
    // const transactionHttp = repositoryFactory.createTransactionRepository();

    // transactionHttp.announce(signedTransaction).subscribe(
    //   (x) => console.log(x),
    //   (err) => console.error(err),
    // );
    return await this.annoannounceTx(signedTransaction);
  }

  createApostille() {
    //   interface wrappedAccount extends Account {
    //     createFromPrivateKey(string, NetworkType);
    //   }
    //  let account: wrappedAccount = {} as wrappedAccount;
    //  account.createFromPrivateKey(this.userPrivateKey, 152);
    //   this.apostille = new Apostille(account)
    //   console.log("🚀 ~ file: symbol.service.ts ~ line 83 ~ SymbolService ~ createApostille ~ this.apostille", this.apostille)
    //  var apostille = this.apostille.transfer(this.common, "Test.txt", this.fileContent, "Test Apostille", 'apostille.hashing["SHA256"]', false, "", true, "symbol.model.network.data.testnet.id");
    //  console.log("🚀 ~ file: symbol.service.ts ~ line 80 ~ SymbolService ~ createApostille ~ apostille", apostille)
    // return symbol.model.transactions.send(this.common, apostille.transaction, this.repositoryFactory).then(function (res) {
    //     // If code >= 2, it's an error
    //     if (res.code >= 2) {
    //         console.error(res.message);
    //     } else {
    //         console.log("\nTransaction: " + res.message);
    //         console.log('Totalres :', res);
    //         console.log("\nCreate a file with the fileContent text and name it:\n" + apostille.data.file.name.replace(/\.[^/.]+$/, "") + " -- Apostille TX " + res.transactionHash.data + " -- Date DD/MM/YYYY" + "." + apostille.data.file.name.split('.').pop());
    //         console.log("When transaction is confirmed the file should audit successfully in Nano");
    //         console.log("\nYou can also take the following hash: " + res.transactionHash.data + " and put it into the audit.js example");
    //         this.txHash = res.transactionHash.data;
    //         this.connect(this.connector);
    //     }
    // }, function (err) {
    //     console.error(err);
    // });
  }
  getTransaction(tx) {
    return this.httpClient
      .get(`${this.nodeUrl}/transactions/confirmed/${tx}`)
      .subscribe(
        (txInfo) => {
          console.log(
            "🚀 ~ file: symbol.service.ts ~ line 59 ~ SymbolService ~ getTransaction ~ txInfo",
            txInfo
          );

          const message = this.hexToString(txInfo["transaction"].message);
          console.log(
            "🚀 ~ file: symbol.service.ts ~ line 62 ~ SymbolService ~ getTransaction ~ message",
            message
          );
          this.messageFromTransaction.next(message);
        },
        (err) => console.error(err)
      );
  }

  hexToString(hex) {
    var string = "";
    for (var i = 0; i < hex.length; i += 2) {
      string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
  }

  getBalance() {
    const rawAddress = localStorage.getItem("symbolAddress");
    const address = Address.createFromRawAddress(rawAddress);
    console.log(
      "🚀 ~ file: symbol.service.ts ~ line 42 ~ SymbolService ~ getBalance ~ address",
      address
    );
    // this.accountHttp.getAccountInfo(address).subscribe(
    //     (accountInfo) => console.log(accountInfo),
    //     (err) => console.error(err),
    //   );
    return this.httpClient
      .get(`${this.nodeUrl}/accounts/${address["address"]}`)
      .subscribe(
        (accountInfo) => {
          const mosaicId = "2CF403E85507F39E";
          const symbolAmount = accountInfo["account"].mosaics.find(
            (mosaic) => mosaic.id === mosaicId
          ).amount;
          this.symbolBalance.next(symbolAmount);
          console.log(
            "🚀 ~ file: symbol.service.ts ~ line 54 ~ SymbolService ~ getBalance ~ symbol",
            symbolAmount
          );
        },
        (err) => console.error(err)
      );
  }

  async doPayment(sum: number, billingId: string) {
    await this.sendTransferTransaction(sum, billingId);
  }
  async sendTransferTransaction(sum: number, billingId: string) {
    const transferTransaction = TransferTransaction.create(
      Deadline.create(this.epochAdjustment),
      this.sellerAddress,
      [NetworkCurrencies.PUBLIC.currency.createRelative(sum)],
      PlainMessage.create(`Bill id is ${billingId} sum the bill is ${sum}`),
      this.networkType,
      UInt64.fromUint(2000000)
    );

    //   [
    //     new Mosaic(new MosaicId('7CDF3B117A3C40CC'), UInt64.fromUint(1000)),
    //     new Mosaic(
    //       new MosaicId('5E62990DCAC5BE8A'),
    //       UInt64.fromUint(10 * Math.pow(10, 6)),
    //     ),
    //   ],

    // replace with sender private key
    // const privateKey =
    // 'F5073B7119B619EBDF08DDCF541C985DDC5ACE074EDF91FE09B0C429CFA9AD48';
    // console.log('userPrivateKey :>> ', this.userPrivateKey, '%%', privateKey);
    // const networkGenerationHash =
    // '45FBCF2F0EA36EFA7923C9BC923D6503169651F7FA4EFC46A8EAF5AE09057EBD';
    const account = Account.createFromPrivateKey(
      this.userPrivateKey,
      this.networkType
    );
    const signedTransaction = account.sign(
      transferTransaction,
      this.networkGenerationHash
    );
    //console.log('Payload:', signedTransaction.payload);
    console.log("Transaction Hash:", signedTransaction.hash);
    // const example = of(null);
    return this.transactionRepository
      .announce(signedTransaction)
      .subscribe((res) => {
        if (
          res.message === "packet 9 was pushed to the network via /transactions"
        ) {
          return of(res.message)
            .pipe(delay(60000))
            .subscribe((t) => {
              console.log("t :>> ", t);
              return this.checkCofirmedTx(signedTransaction.hash);
            });
        }
      });
  }

  annoannounceTx(signedTx: SignedTransaction) {
    return this.transactionRepository.announce(signedTx).subscribe((res) => {
      if (
        res.message === "packet 9 was pushed to the network via /transactions"
      ) {
        return of(res.message)
          .pipe(delay(60000))
          .subscribe((t) => {
            console.log("t :>> ", t);
            return this.checkCofirmedTx(signedTx.hash);
          });
      }
    });
  }
  checkUncofirmedTx(hash: string) {
    return this.httpClient
      .get(`${this.nodeUrl}/transactions/unconfirmed/${hash}`)
      .subscribe(
        (tx) => {
          console.log(
            "🚀 ~ file: symbol.service.ts ~ line 111 ~ SymbolService ~ checkUncofirmedTx ~ tx",
            tx
          );
          if (tx["meta"].hash === hash) {
            this.checkCofirmedTx(tx["meta"].hash);
          } else {
            this.checkCofirmedTx(hash);
          }
        },
        (err) => console.log("HTTP Error", err),
        () => console.log("HTTP request completed.")
      );
  }

  checkCofirmedTx(hash: string) {
    return this.httpClient
      .get(`${this.nodeUrl}/transactions/confirmed/${hash}`)
      .subscribe(
        (tx) => {
          console.log(
            "🚀 ~ file: symbol.service.ts ~ line 121 ~ SymbolService ~ checkCofirmedTx ~ tx",
            tx
          );
          if (tx["meta"].hash === hash) {
            console.log("Confirmed :>> ", tx["meta"].hash);
            this.confirmedHash.next(tx["meta"].hash);
            this.confirmedHash.complete();
          } else {
            this.checkUncofirmedTx(hash);
          }
        },
        (err) => console.log("HTTP Error", err),
        () => console.log("HTTP request completed.")
      );
  }

  async doPrepare(sender: string, sum: number) {}

  async sign(tx: string, secret: string) {}

  // use txBlob from the previous example
  async doSubmit(txBlob) {}
}
