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
    MosaicId, NetworkCurrencies,
    NetworkType,
    PlainMessage,
    PublicAccount,
    NetworkRepository,
    RepositoryFactoryHttp,
    TransactionMapping,
    TransactionService, TransferTransaction,
    Address,
    UInt64
  } from 'symbol-sdk';

@Injectable({
  providedIn: "root",
})
export class SymbolService {
  networkType = NetworkType.TEST_NET;
  epochAdjustment = 1573430400;
  accountService = null;
  rawAddress = 'TDLEYX-HXPTRG-DJA2TM-6JD2CR-2NS6QT-ZRKAGM-POI ';
  sellerAddress = Address.createFromRawAddress(this.rawAddress);
  nodeUrl = 'http://api-01.us-east-1.testnet.symboldev.network:3000';
    repositoryFactory = new RepositoryFactoryHttp(this.nodeUrl);
    transactionRepository = this.repositoryFactory.createTransactionRepository();
    accountHttp = this.repositoryFactory.createAccountRepository();
  constructor(private httpClient: HttpClient) {
     this.accountService = new AccountService(this.repositoryFactory);
  }

  getBalance(rawAddress: string) {
    const address = Address.createFromRawAddress(rawAddress);
    console.log("🚀 ~ file: symbol.service.ts ~ line 42 ~ SymbolService ~ getBalance ~ address", address)
    this.accountHttp.getAccountInfo(address).subscribe(
        (accountInfo) => console.log(accountInfo),
        (err) => console.error(err),
      );
      this.httpClient.get(`${this.nodeUrl}/accounts/${address['address']}`)
      .subscribe(
        (accountInfo) => {
            const mosaicId = '2CF403E85507F39E';
            const symbol = accountInfo['account'].mosaics.find(mosaic => mosaic.id === mosaicId).amount;
            console.log("🚀 ~ file: symbol.service.ts ~ line 54 ~ SymbolService ~ getBalance ~ symbol", symbol)
        },
        (err) => console.error(err),
      );

  }

  async doPayment(sum: number, senderAddress: string, secret: string) {
    const transferTransaction = TransferTransaction.create(
        Deadline.create(this.epochAdjustment),
        this.sellerAddress,
        [NetworkCurrencies.PUBLIC.currency.createRelative(222)],
        PlainMessage.create('This is a test message payment info'),
        this.networkType,
        UInt64.fromUint(2000000),
      );
    
    //   [
    //     new Mosaic(new MosaicId('7CDF3B117A3C40CC'), UInt64.fromUint(1000)),
    //     new Mosaic(
    //       new MosaicId('5E62990DCAC5BE8A'),
    //       UInt64.fromUint(10 * Math.pow(10, 6)),
    //     ),
    //   ],
    
        // replace with sender private key
        const privateKey =
        'F5073B7119B619EBDF08DDCF541C985DDC5ACE074EDF91FE09B0C429CFA9AD48';
        const networkGenerationHash =
        '45FBCF2F0EA36EFA7923C9BC923D6503169651F7FA4EFC46A8EAF5AE09057EBD';
      const account = Account.createFromPrivateKey(privateKey, this.networkType);
      const signedTransaction = account.sign(
        transferTransaction,
        networkGenerationHash,
      );
      console.log('Payload:', signedTransaction.payload);
      console.log('Transaction Hash:', signedTransaction.hash);
      
      const response = this.transactionRepository
        .announce(signedTransaction)
        .toPromise();
        response
        .then(tx => {
            console.log(tx);
        })
  }

  async doPrepare(sender: string, sum: number) {
    
  }

  async sign(tx: string, secret: string) {
     
  }

  // use txBlob from the previous example
  async doSubmit(txBlob) {
    
  }
}
