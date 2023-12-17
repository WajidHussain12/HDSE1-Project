import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit, OnInit{
  ngOnInit(): void {

 
  }

  ngAfterViewInit() {
    "use strict";

    const url: string = window.location + "";
    const path: string = url.replace(
      window.location.protocol + "//" + window.location.host + "/",
      ""
    );

    const element = $("ul#sidebarnav a").filter(function () {
      // Cast 'this' to HTMLAnchorElement
      return (this as HTMLAnchorElement).href === url || (this as HTMLAnchorElement).href === path;
    });

    element.parentsUntil(".sidebar-nav").each(function (index) {
      if ($(this).is("li") && $(this).children("a").length !== 0) {
        $(this).children("a").addClass("active");
        $(this).parent("ul#sidebarnav").length === 0
          ? $(this).addClass("active")
          : $(this).addClass("selected");
      } else if (!$(this).is("ul") && $(this).children("a").length === 0) {
        $(this).addClass("selected");
      } else if ($(this).is("ul")) {
        $(this).addClass("in");
      }
    });

    element.addClass("active");

    $("#sidebarnav a").on("click", function (e) {
      if (!$(this).hasClass("active")) {
        $("ul", $(this).parents("ul:first")).removeClass("in");
        $("a", $(this).parents("ul:first")).removeClass("active");

        $(this).next("ul").addClass("in");
        $(this).addClass("active");
      } else if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).parents("ul:first").removeClass("active");
        $(this).next("ul").removeClass("in");
      }
    });

    $("#sidebarnav >li >a.has-arrow").on("click", function (e) {
      e.preventDefault();
    });
  }
}
