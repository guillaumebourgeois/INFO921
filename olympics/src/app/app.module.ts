import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Pedometer } from '@ionic-native/pedometer';

/// Application pages
import { MyApp              } from './app.component';
import { HomePage           } from '../pages/home/home';
import { MapPage            } from '../pages/map/map';
import { HistoryPage        } from '../pages/history/history';
import { SportHistoryPage   } from '../pages/sport-history/sport-history';
import { ActivityPage       } from '../pages/activity/activity';
import { StatisticsPage     } from '../pages/statistics/statistics';
import { SettingsPage       } from '../pages/settings/settings';
import { LoginPage          } from '../pages/login/login';
import { TabsPage           } from '../pages/tabs/tabs';
import { CreateAccountPage  } from '../pages/create-account/create-account';

// Application providers
import { Sports     } from '../providers/sports';
import { Timer      } from '../providers/timer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    HistoryPage,
    ActivityPage,
    StatisticsPage,
    SettingsPage,
    LoginPage,
    TabsPage,
    CreateAccountPage,
    SportHistoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    HistoryPage,
    ActivityPage,
    StatisticsPage,
    SettingsPage,
    LoginPage,
    TabsPage,
    CreateAccountPage,
    SportHistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    Pedometer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // Providers
    Sports,
    Timer
  ]
})
export class AppModule {}
