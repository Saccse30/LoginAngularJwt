import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Required for ngStyle and more
import { MenuModel } from '../interface/menu-model';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // <-- Add this line
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
   menus !: MenuModel[];
  tabs = ['First', 'Second', 'Third'];
  constructor(private services: ServicesService){}
  activeIndex = 0;
  lineStyle: { left: string; width: string } = { left: '0px', width: '0px' };
  isAnimating = false;

  @ViewChild('navRef') navRef!: ElementRef<HTMLElement>;
  ngOnInit(): void {
    debugger;
     this.services.getMenuModels().subscribe(({
      next:(data)=>{console.log(this.menus=data);},

      error:(error)=>{console.log("Failed to get MenuModels"); console.error(error);}
    }))
  }
ngAfterViewInit() {
  if (this.navRef) {
    this.updateLine();
  }
}

activateTab(index: number, event: MouseEvent) {
  if (this.activeIndex === index || this.isAnimating) return;

  const newEl = (event.target as HTMLElement).closest('li') as HTMLElement;
  const newLeft = newEl.offsetLeft;
  const newWidth = newEl.offsetWidth;

  this.isAnimating = true;

  this.lineStyle = {
    ...this.lineStyle,
    width: Math.abs(newLeft - parseFloat(this.lineStyle.left)) + newWidth + 'px'
  };

  setTimeout(() => {
    this.lineStyle = {
      left: newLeft + 'px',
      width: newWidth + 'px'
    };

    this.activeIndex = index;

    // Optional: Navigate if coreURL is valid
    const selectedMenu = this.menus[index];
    if (selectedMenu.coreURL && selectedMenu.coreURL !== '#') {
      window.location.href = selectedMenu.coreURL; // or use Angular Router if internal
    }

    setTimeout(() => {
      this.isAnimating = false;
    }, 150);
  }, 300);
}

private updateLine() {
  if (!this.navRef) return;

  const nav = this.navRef.nativeElement;
  const activeEl = nav.querySelectorAll('ul li')[this.activeIndex] as HTMLElement;

  if (activeEl) {
    this.lineStyle = {
      left: activeEl.offsetLeft + 'px',
      width: activeEl.offsetWidth + 'px'
    };
  }
}

}
