import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  ngOnInit() {
    // Admin Panel settings

    //****************************
    /* This is for the mini-sidebar if width is less than 1170*/
    //****************************
    const setsidebartype = () => {
      const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
      if (width < 1199) {
        $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
        $("#main-wrapper").addClass("mini-sidebar");
      } else {
        $("#main-wrapper").attr("data-sidebartype", "full");
        $("#main-wrapper").removeClass("mini-sidebar");
      }
    };

    setsidebartype();
    $(window).ready(setsidebartype);
    $(window).on("resize", setsidebartype);

    //****************************
    /* This is for sidebartoggler*/
    //****************************
    $(".sidebartoggler").on("click", () => {
      $("#main-wrapper").toggleClass("mini-sidebar");
      if ($("#main-wrapper").hasClass("mini-sidebar")) {
        $(".sidebartoggler").prop("checked", true);
        $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
      } else {
        $(".sidebartoggler").prop("checked", false);
        $("#main-wrapper").attr("data-sidebartype", "full");
      }
    });

    $(".sidebartoggler").on("click", () => {
      $("#main-wrapper").toggleClass("show-sidebar");
    });
  }
}
