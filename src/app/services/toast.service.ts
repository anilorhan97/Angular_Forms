import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

constructor(private toastService: HotToastService) { }
success(message: string) {
    this.toastService.success(message, {
      duration: 5000,
      position: 'top-right',
      style: {
        border: '#713200',
        padding: '16px',
        color: '#FFF',
        backgroundColor: '#4BB543',
      },
    });
  }

  error(message: string) {
    this.toastService.error(message, {
      position: 'top-right',
      style: {
        border: '#713200',
        padding: '16px',
        color: '#FFF',
        backgroundColor: '#ff5722',
      },
      duration: 2000,
    });
  }
}
