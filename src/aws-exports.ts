import { ResourcesConfig } from 'aws-amplify';

const awsExports: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolClientId: "7vrr1uur3vtc0q2jpabbu7lfba",
      userPoolId: "us-east-1_PmlIrwBuP",
    }
  },
  API: {
    REST: {
      'BCGamesServiceAPI': {
        service: "BCGamesServiceAPI",
        endpoint: "https://e7oyonnbha.execute-api.us-east-1.amazonaws.com/prod",
        region: "us-east-1",
      }
    }
  }
}

export default awsExports;
