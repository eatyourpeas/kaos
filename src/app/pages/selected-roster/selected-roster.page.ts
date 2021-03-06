import { Component, OnInit } from '@angular/core';
import { DatesService } from '../../services/dates.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-selected-roster',
  templateUrl: './selected-roster.page.html',
  styleUrls: ['./selected-roster.page.scss'],
})
export class SelectedRosterPage implements OnInit {

  user_id: string;
  user_dates;
  this_month: string;
  select_years = [];
  selected_year;
  showSpinner: boolean;

  constructor(private activatedRoute: ActivatedRoute, private datesService: DatesService) { }

  ngOnInit() {
    this.user_id = this.activatedRoute.snapshot.paramMap.get('uid');
    this.showSpinner = true;
    this.datesService.datesForUser(this.user_id).subscribe(myDates => {
      this.showSpinner = false;
        if (myDates) {
          const my_dates = myDates.map(date => {
            const uid = date.payload.doc.id;
            const day = date.payload.doc.data()['date'].toDate();
            let format = date.payload.doc.data()['format'];
            if (format == null) {
              format = moment(day).format('Do ddd MMM YYYY');
            }
            return {uid, day, format};
          }).sort((a, b) => {
            return a.day - b.day;
          });
          let first_date = moment(my_dates[0].day).year();
          const last_date = moment(my_dates[my_dates.length - 1].day).year();

          while (first_date <= last_date) {
            this.select_years.push(first_date);
            first_date += 1;
          }
          this.selected_year = moment().year();

          this.getMyDates();
        }
    });
  }

  selectYear(event) {
    this.selected_year = event.detail.value;
    this.getMyDates();
  }

  getMyDates() {
    this.showSpinner = true;
      this.datesService.datesForUser(this.user_id).subscribe(myDates => {
        this.showSpinner = false;
          if (myDates) {
            const my_dates = myDates.map(date => {
              const uid = date.payload.doc.id;
              const day = date.payload.doc.data()['date'].toDate();
              let format = date.payload.doc.data()['format'];
              if (format == null) {
                format = moment(day).format('Do ddd MMM YYYY');
              }
              return {uid, day, format};
            }).sort((a, b) => {
              return a.day - b.day;
            });
            this.user_dates = my_dates.filter(date => moment(date.day).year() == this.selected_year);
          }
      });
  }

}
