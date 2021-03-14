import { Component, OnInit, AfterViewInit } from "@angular/core";
import { User } from "src/app/shared/models/user";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.component.html",
  styleUrls: ["./user-account.component.scss"],
})
export class UserAccountComponent implements OnInit {
  // Enable Update Button
  showBalance = false;
  showAddress = false;
  isShowChangeBlock = false;
  userSymbolAddress = '';
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.showBalance = this.showAddress = true;
    this.userSymbolAddress = localStorage.getItem('symbolAddress');
  }

  addSymbolAddress(userSymbolAddress) {
    if (confirm(`Are you want to write the address ${this.userSymbolAddress}
    instead of ${localStorage.getItem('symbolAddress')} ?`)) {
      
      localStorage.setItem('symbolAddress', userSymbolAddress);
    } else {
       
 
    }
    
  }
}
