// import { trigger, state, style, transition, animate } from '@angular/animations';
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-makes-us-different',
//   templateUrl: './makes-us-different.component.html',
//   styleUrls: ['./makes-us-different.component.css'],
//   animations: [
//     trigger('enlarge', [
//       state('small', style({
//         fontSize: '24px',  // Set your original font size here
//       })),
//       state('large', style({
//         fontSize: '36px',  // Set your enlarged font size here
//       })),
//       transition('small <=> large', animate('300ms ease-in-out')),
//     ]),
//   ],
// })
// export class  MakesUsDifferentComponent implements OnInit {
//   isEnlarged = false;

//   toggleEnlarged() {
//     this.isEnlarged = !this.isEnlarged;
//   }

//   ngOnInit() {
//     // Initial state
//     this.isEnlarged = false;
//   }
// }
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-makes-us-different',
  templateUrl: './makes-us-different.component.html',
  styleUrls: ['./makes-us-different.component.css'],
  animations: [
    trigger('enlarge', [
      state(
        'small',
        style({
          fontSize: '24px', // Original font size
        })
      ),
      state(
        'large',
        style({
          fontSize: '36px', // Enlarged font size
        })
      ),
      transition('small <=> large', animate('300ms ease-in-out')),
    ]),
  ],
})
export class MakesUsDifferentComponent implements OnInit {
  isEnlarged = false;

  toggleEnlarged() {
    this.isEnlarged = !this.isEnlarged;
  }

  ngOnInit() {
    this.isEnlarged = false; // Set initial state
  }
}
