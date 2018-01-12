import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';

/// Application pages
import { MyApp              } from './app.component';
import { HomePage           } from '../pages/home/home';
import { MapPage            } from '../pages/map/map';
import { ActivityPage       } from '../pages/activity/activity';
import { StatisticsPage     } from '../pages/statistics/statistics';
import { SettingsPage       } from '../pages/settings/settings';
import { ConnectionPage     } from '../pages/connection/connection';
import { TabsPage           } from '../pages/tabs/tabs';
import { CreateAccountPage  } from '../pages/create-account/create-account';

// Application providers
import { LocalData  } from '../providers/local-data';
import { Sports     } from '../providers/sports'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ActivityPage,
    StatisticsPage,
    SettingsPage,
    ConnectionPage,
    TabsPage,
    CreateAccountPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    ActivityPage,
    StatisticsPage,
    SettingsPage,
    ConnectionPage,
    TabsPage,
    CreateAccountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // Providers
    LocalData,
    Sports
  ]
})
export class AppModule {}
