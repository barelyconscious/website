import { ResourcesConfig } from 'aws-amplify';

const awsExports: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolClientId: "2l9dvhe4vr8kpmp62rnliuktla",
      userPoolId: "us-east-1_BPUX20cJH",
    }
  },
  API: {
    REST: {
      'BCGamesServiceAPI': {
        service: "BCGamesServiceAPI",
        // endpoint: "http://localhost:9000/local", // This is the local endpoint
        endpoint: "https://e7oyonnbha.execute-api.us-east-1.amazonaws.com/main",
        region: "us-east-1",
      }
    }
  }
}

export default awsExports;
