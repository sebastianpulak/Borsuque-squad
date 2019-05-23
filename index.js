import { Navigation } from 'react-native-navigation';
import Login from './src/Login';
import Main from './src/Main';

export function Screens() {
  Navigation.registerComponent('Main', () => Main);
  Navigation.registerComponent('Login', () => Login);
}

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
          stack: {
            id: 'App',
              children: [
              {
                component: {
                  name: 'Login',
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