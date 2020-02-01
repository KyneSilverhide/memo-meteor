import {ServiceConfiguration} from "meteor/service-configuration";

ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
        $set: {
            loginStyle: "popup",
            clientId: "357542391152-q3pgmdactq8qf31ccvj7uoutdrt4dqgv.apps.googleusercontent.com",
            secret: "a1S2CaHQh83jsMFEXMXb-Rf2"
        }
    }
);