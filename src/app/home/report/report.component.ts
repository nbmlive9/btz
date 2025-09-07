import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthUserService } from '../service/auth-user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  wdata: any;
  totalRecords: number = 0;
  page: number = 1;
  perPage: number = 20;
  loading: boolean = false;
  allLoaded: boolean = false;
  pro: any[] = [];
startDate: string = ''; // bound to input
endDate: string = '';
allData: any[] = [];
  constructor(private location: Location, private api: AuthUserService) {}

  ngOnInit() {
    this.loadMore(); // Load first page
  }

  Back() {
    this.location.back();
  }

  onScroll(event: any): void {
    const target = event.target;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 10) {
      if (!this.loading && !this.allLoaded) {
        this.loadMore();
      }
    }
  }

loadMore(): void {
  if (this.allLoaded || this.loading) return; // stop if already loading or finished

  this.loading = true;

  this.api.WalletReportLoad(this.page, this.perPage).subscribe({
    next: (res: any) => {
      const newData = res.data?.data || [];

      if (newData.length > 0) {
        // Append new data to existing data
        this.allData = [...this.allData, ...newData];
        this.applyDateFilter(); // filter updated list
        this.page++; // increment page number
      } else {
        // no more data from backend
        this.allLoaded = true;
      }

      this.loading = false;
    },
    error: (err) => {
      console.error('Error loading transactions', err);
      this.loading = false;
    }
  });
}


applyDateFilter(): void {
  if (!this.startDate && !this.endDate) {
    this.pro = [...this.allData]; // no filter, show all
    return;
  }

  const start = this.startDate ? new Date(this.startDate) : null;
  const end = this.endDate ? new Date(this.endDate) : null;

  this.pro = this.allData.filter((wd:any) => {
    const cdate = new Date(wd.cdate);
    if (start && end) {
      return cdate >= start && cdate <= end;
    } else if (start) {
      return cdate >= start;
    } else if (end) {
      return cdate <= end;
    }
    return true;
  });
};



}
