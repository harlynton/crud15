import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { getFirestore, provideFirestore} from '@angular/fire/firestore'
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';

//Con esta linea de codigo se arranca la app desde un componente en lugar de hacerlo desde un módulo:
bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes),
        importProvidersFrom(
            provideFirebaseApp(() => initializeApp(environment.firebase)),
            provideFirestore(() => getFirestore())
        )
    ],
}).catch((err) => console.log(err));