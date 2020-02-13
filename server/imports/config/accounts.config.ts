import { ServiceConfiguration } from 'meteor/service-configuration';
import { Meteor } from 'meteor/meteor';

ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: Meteor.settings.private.googleservice.clientId,
      secret: Meteor.settings.private.googleservice.secret
    }
  }
);
