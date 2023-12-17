import { Block } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import 'bootstrap';
// app.module.ts



declare const Menu: any;
declare const bootstrap: any;
declare const Helpers: any;
declare global {
  interface Window {
    Helpers: any;
  }
}
@Component({
  selector: 'app-usersidebar',
  templateUrl: './usersidebar.component.html',
  styleUrls: ['./usersidebar.component.css']
})
export class UsersidebarComponent implements OnInit {
  menu: any;
  animate: boolean;

  UserName: any
  ngOnInit() {
    if (window.Helpers) {
      window.Helpers.setAutoUpdate(true);
    }

    var userName: any = localStorage.getItem("UserName")
    this.UserName = userName










    this.initializeMenu();
    this.initializeTogglers();
    this.initializeMenuToggleOnHover();
    this.initBootstrapTooltip();
    this.initAccordionActiveClass();
    this.initAutoUpdateLayout();
    this.initTogglePasswordVisibility();
    this.initSpeechToText();

    // Manage menu expanded/collapsed with templateCustomizer & local storage
    if (window.Helpers.isSmallScreen()) {
      return;
    }

    Helpers.setCollapsed(true, false);
  }

  private initializeMenu() {
    const layoutMenuEls = document.querySelectorAll('#layout-menu') as NodeListOf<Element>;
    layoutMenuEls.forEach((element: Element) => {
      this.menu = new Menu(element, {
        orientation: 'vertical',
        closeChildren: false
      });

      Helpers.scrollToActive((this.animate = false));
      Helpers.mainMenu = this.menu;
    });
  }

  private initializeTogglers() {
    const menuTogglerEls = document.querySelectorAll('.layout-menu-toggle') as NodeListOf<HTMLElement>;
    menuTogglerEls.forEach((item: HTMLElement) => {
      item.addEventListener('click', (event: Event) => {
        event.preventDefault();
        Helpers.toggleCollapsed();
      });
    });
  }

  private initializeMenuToggleOnHover() {
    const delay = function (elem: HTMLElement, callback: () => void) {
      let timeout: any = null;

      elem.onmouseenter = function () {
        if (!Helpers.isSmallScreen()) {
          timeout = setTimeout(callback, 300);
        } else {
          timeout = setTimeout(callback, 0);
        }
      };

      elem.onmouseleave = function () {
        const layoutMenuToggle = document.querySelector('.layout-menu-toggle');
        if (layoutMenuToggle) {
          layoutMenuToggle.classList.remove('d-block');
        }
        clearTimeout(timeout);
      };
    };

    const layoutMenu = document.getElementById('layout-menu');
    if (layoutMenu) {
      delay(layoutMenu, () => {
        if (!Helpers.isSmallScreen()) {
          const layoutMenuToggle = document.querySelector('.layout-menu-toggle');
          if (layoutMenuToggle) {
            layoutMenuToggle.classList.add('d-block');
          }
        }
      });
    }
  }

  private initBootstrapTooltip() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl: any) => {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  private initAccordionActiveClass() {
    const accordionActiveFunction = (e: Event) => {
      const target = e.target as HTMLElement;
      const accordionItem = target.closest('.accordion-item');
      if (accordionItem) {
        accordionItem.classList.toggle('active', e.type === 'show.bs.collapse');
      }
    };

    const accordionTriggerList = document.querySelectorAll('.accordion') as NodeListOf<Element>;
    accordionTriggerList.forEach((accordionTriggerEl: Element) => {
      accordionTriggerEl.addEventListener('show.bs.collapse', accordionActiveFunction);
      accordionTriggerEl.addEventListener('hide.bs.collapse', accordionActiveFunction);
    });
  }

  private initAutoUpdateLayout() {
    window.Helpers.setAutoUpdate(true);
  }

  private initTogglePasswordVisibility() {
    window.Helpers.initPasswordToggle();
  }

  private initSpeechToText() {
    window.Helpers.initSpeechToText();
  }

  logoutModal() {
    const LogoutModal = document.getElementById("LogoutModal");

    if (LogoutModal) {
      const currentDisplayStyle = window.getComputedStyle(LogoutModal).getPropertyValue('display');

      if (currentDisplayStyle === "none" || currentDisplayStyle === "") {
        LogoutModal.style.display = "block";
        setTimeout(() => {
          LogoutModal.style.opacity = "1";
        }, 0);
      } else {
        LogoutModal.style.opacity = "0";
        setTimeout(() => {
          LogoutModal.style.display = "none";
        }, 300);
      }
    }
  }

  logout() {
    const LogoutModal = document.getElementById("LogoutModal");

    if (LogoutModal) {
      LogoutModal.style.setProperty('display', 'none', 'important');
      const currentDisplayStyle = window.getComputedStyle(LogoutModal).getPropertyValue('display');
      if (currentDisplayStyle === "none") {

        LogoutModal.classList.add("off");
      }
    }
  }
}
