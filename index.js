import { Navigation } from 'react-native-navigation';
import Login from './src/Login';
import Main from './src/Main';
import Loading from './src/Loading';
import Details from './src/Details';
import SignUp from './src/SignUp'

export function Screens() {
  Navigation.registerComponent('Main', () => Main);
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Loading', () => Loading);
  Navigation.registerComponent('Details', () => Details);
  Navigation.registerComponent('SignUp', () => SignUp);
}

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
          stack: {
            id: 'App',
              children: [
              {
                component: {
                  name: 'Loading',
                  options: {
                    topBar: {
                      title: {
                        text: 'Borsuque Squad'
                      },
                    }
                  },
                }
              }
            ],
          }
        }
      });
    });