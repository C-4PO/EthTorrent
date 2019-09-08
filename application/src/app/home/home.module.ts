import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ListItemTorrentComponent } from '../shared/components/list-item-torrent/list-item-torrent.component';

@NgModule({
  declarations: [HomeComponent, ListItemTorrentComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, FormsModule, ReactiveFormsModule, AngularSvgIconModule],
})
export class HomeModule {}
