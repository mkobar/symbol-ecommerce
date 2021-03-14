import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
const RippleAPI = require("ripple-lib").RippleAPI;

@Injectable({
  providedIn: "root",
})
export class PayIdService {
  api = null;
  grpcUrl = null;
  ilpClient = null;
  xrpClient = null;
  payIdClient = null;
  ownerAddress = "rJbWARGgCEwHcMn2vKqo4ho76AtzzPGC7X";
  constructor(private httpClient: HttpClient) {
    this.api = new RippleAPI({
      server: "wss://s.altnet.rippletest.net:51233", // Public rippled server
    });
  }

  getBalance() {
    return this.api.connect().then(() => {
      // console.log("getting account info for", this.ownerAddress);
      return this.api.getAccountInfo(this.ownerAddress);
    });
  }

  async doPayment(sum: number, senderAddress: string, secret: string) {
    // this.api = new RippleAPI({
    //   server: "wss://s.altnet.rippletest.net:51233" // Public rippled server
    // });
    return this.api
      .connect()
      .then(() => {
        return this.doPrepare(senderAddress, sum);
      })
      .then((tx) => {
        console.log(tx);

        return this.sign(tx, secret);

        /* end custom code -------------------------------------- */
      })
      .then((txBlob) => {
        return this.doSubmit(txBlob);
      })
      .catch(console.error);
  }

  async doPrepare(sender: string, sum: number) {
    const preparedTx = await this.api.prepareTransaction(
      {
        TransactionType: "Payment",
        Account: sender,
        Amount: await this.api.xrpToDrops(sum.toString()),
        Destination: this.ownerAddress,
      },
      {
        // Expire this transaction if it doesn"t execute within ~5 minutes:
        maxLedgerVersionOffset: 75,
      }
    );
    console.log("preparedTx :>> ", preparedTx);
    // const maxLedgerVersion = preparedTx.instructions.maxLedgerVersion;
    // console.log("Prepared transaction instructions:", preparedTx.txJSON);
    // console.log("Transaction cost:", preparedTx.instructions.fee, "XRP");
    // console.log("Transaction expires after ledger:", maxLedgerVersion);
    return preparedTx.txJSON;
  }

  async sign(tx: string, secret: string) {
    console.log("@@@@@tx :>> ", tx);
    const response = await this.api.sign(tx, secret);
    const txID = response.id;
    console.log("Identifying hash:", txID);
    const txBlob = response.signedTransaction;
    console.log("Signed blob:", txBlob);
    return txBlob;
  }

  // use txBlob from the previous example
  async doSubmit(txBlob) {
    const latestLedgerVersion = await this.api.getLedgerVersion();

    const result = this.api.submit(txBlob);

    console.log("Tentative result code:", result.resultCode);
    console.log("Tentative result message:", result.resultMessage);

    // Return the earliest ledger index this transaction could appear in
    // as a result of this submission, which is the first one after the
    // validated ledger at time of submission.
    return latestLedgerVersion + 1;
  }
}
