
import { Component } from '@angular/core';

@Component({
  selector: 'app-error500',
  templateUrl: './error500.component.html',
  styles: `.error-page {
    text-align: center;
    margin-top: 50px;
  
    h1 {
      font-size: 4rem;
      color: #ff4d4f;
    }
  
    p {
      font-size: 1.5rem;
      color: #555;
    }
  
    .btn {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      text-decoration: none;
  
      &:hover {
        background-color: #0056b3;
      }
    }
  }
  `
})
export class Error500Component {

}
