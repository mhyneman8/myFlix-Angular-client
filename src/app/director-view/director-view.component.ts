import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.css']
})
export class DirectorViewComponent implements OnInit {
 
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string,
      bio: string,
      birth: Date,
      death: Date,
      imageUrl: any
    }
  ) { }

  ngOnInit(): void {
    
  }
}
