// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { MockService, ngMocks } from 'ng-mocks';
import { AppServiceService } from './app/app-service.service';
import { EMPTY } from 'rxjs';
import { User } from './app/models/user';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: true },
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
);

ngMocks.autoSpy('jasmine');

ngMocks.defaultMock(AppServiceService, () => {
  registerUser: () => EMPTY;
})