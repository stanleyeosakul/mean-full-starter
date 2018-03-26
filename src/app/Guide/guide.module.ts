import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../Shared/shared.module';

import { StripeApiComponent } from './components/stripe-api/stripe-api.component';
import { AngularUniversalComponent } from './components/angular-universal/angular-universal.component';
import { SeoSocialmediaComponent } from './components/seo-socialmedia/seo-socialmedia.component';
import { JwtAuthComponent } from './components/jwt-auth/jwt-auth.component';
import { MongoDbComponent } from './components/mongo-db/mongo-db.component';
import { AwsS3Component } from './components/aws-s3/aws-s3.component';
import { HerokuDeployComponent } from './components/heroku-deploy/heroku-deploy.component';
import { AwsDeployComponent } from './components/aws-deploy/aws-deploy.component';
import { NowDeployComponent } from './components/now-deploy/now-deploy.component';

const routes: Routes = [
  { path: 'stripe-payment-api-integration', component: StripeApiComponent},
  { path: 'angular-universal-setup', component: AngularUniversalComponent},
  { path: 'search-engine-optimization-and-social-media', component: SeoSocialmediaComponent},
  { path: 'authentication-with-jwt', component: JwtAuthComponent},
  { path: 'cloud-database-service-with-mongodb-atlas', component: MongoDbComponent},
  { path: 'cloud-storage-with-amazon-s3', component: AwsS3Component},
  { path: 'deploy-with-heroku', component: HerokuDeployComponent},
  { path: 'deploy-with-aws', component: AwsDeployComponent},
  { path: 'deploy-with-now', component: NowDeployComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    StripeApiComponent,
    AngularUniversalComponent,
    SeoSocialmediaComponent,
    JwtAuthComponent,
    MongoDbComponent,
    AwsS3Component,
    HerokuDeployComponent,
    AwsDeployComponent,
    NowDeployComponent
  ]
})
export class GuideModule { }
