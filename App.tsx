// import * as React from 'react';
// import {StatusBar} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import HomeScreen from './src/screens/Home';
// import PostingScreen from './src/screens/Posting';
// import ProfileScreen from './src/screens/Profile';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import LoginScreen from './src/screens/Login';

// import {AppContext} from './src/redux/contexts';

// const Tab = createBottomTabNavigator();
// const HomeStack = createNativeStackNavigator();
// const PostingStack = createNativeStackNavigator();
// const ProfileStack = createNativeStackNavigator();

// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator screenOptions={{headerShown: false}}>
//       <HomeStack.Screen name="brtr" component={HomeScreen} />
//     </HomeStack.Navigator>
//   );
// }
// function PostingStackScreen() {
//   return (
//     <PostingStack.Navigator screenOptions={{headerShown: false}}>
//       <PostingStack.Screen name="PostingScreen" component={PostingScreen} />
//     </PostingStack.Navigator>
//   );
// }
// function ProfileStackScreen() {
//   return (
//     <ProfileStack.Navigator screenOptions={{headerShown: false}}>
//       <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
//     </ProfileStack.Navigator>
//   );
// }

// export default function App() {
//   const [authed, setAuthed] = React.useState(false);
//   const appContextValue = React.useMemo(
//     () => ({
//       authed,
//       setAuthed,
//     }),
//     [authed],
//   );

//   return (
//     <AppContext.Provider value={appContextValue}>
//       <NavigationContainer>
//         <StatusBar
//           animated={true}
//           backgroundColor="transparent"
//           translucent={true}
//         />
//         {authed ? (
//           <Tab.Navigator
//             screenOptions={({route}) => ({
//               tabBarIcon: ({focused, color, size}) => {
//                 let iconName = '';

//                 if (route.name === 'Home') {
//                   iconName = focused ? 'home' : 'home-outline';
//                 } else if (route.name === 'Camera') {
//                   iconName = focused ? 'camera' : 'camera-outline';
//                 } else if (route.name === 'Profile') {
//                   iconName = focused ? 'person' : 'person-outline';
//                 }
//                 return <Ionicons name={iconName} size={size} color={color} />;
//               },
//               tabBarActiveTintColor: 'teal',
//               tabBarInactiveTintColor: 'gray',
//               tabBarLabelStyle: {fontSize: 15, bottom: 8},
//               tabBarStyle: {
//                 height: 70,
//                 margin: 16,
//                 borderRadius: 16,
//                 bottom: 8,
//                 backgroundColor: 'pink',
//               },
//             })}>
//             <Tab.Screen
//               options={{headerShown: false}}
//               name="Home"
//               component={HomeStackScreen}
//             />
//             <Tab.Screen
//               options={{headerShown: false, tabBarHideOnKeyboard: true}}
//               name="Camera"
//               component={PostingStackScreen}
//             />
//             <Tab.Screen
//               options={{headerShown: false}}
//               name="Profile"
//               component={ProfileStackScreen}
//             />
//           </Tab.Navigator>
//         ) : (
//           <LoginScreen />
//         )}
//       </NavigationContainer>
//     </AppContext.Provider>
//   );
// }

// ==============================

import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/Home';
import PostingScreen from './src/screens/Posting';
import ProfileScreen from './src/screens/Profile';
import UploadScreen from './src/screens/Profile/uploads';

import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './src/screens/Login';
import SignUpScreen from './src/screens/Register';

import {AppContext} from './src/redux/contexts';
//import Firebase, {FirebaseProvider} from './src/utils';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const Tab = createBottomTabNavigator();
// const HomeStack = createNativeStackNavigator();
// const PostingStack = createNativeStackNavigator();
// const ProfileStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="signin" component={LoginScreen} />
      <AuthStack.Screen name="signup" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator screenOptions={{headerShown: false}}>
//       <HomeStack.Screen name="brtr" component={HomeScreen} />
//     </HomeStack.Navigator>
//   );
// }
// function PostingStackScreen() {
//   return (
//     <PostingStack.Navigator screenOptions={{headerShown: false}}>
//       <PostingStack.Screen name="PostingScreen" component={PostingScreen} />
//     </PostingStack.Navigator>
//   );
// }
// function ProfileStackScreen() {
//   return (
//     <ProfileStack.Navigator screenOptions={{headerShown: false}}>
//       <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
//       <ProfileStack.Screen
//         options={{headerShown: true}}
//         name="Uploads"
//         component={UploadScreen}
//       />
//     </ProfileStack.Navigator>
//   );
// }

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'teal',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {fontSize: 15, bottom: 8},
        tabBarStyle: {
          height: 70,
          margin: 8, //16,
          borderRadius: 16,
          bottom: 8,
          backgroundColor: 'pink',
        },
      })}>
      <Tab.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Camera"
        component={PostingScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [authed, setAuthed] = React.useState(false);
  const appContextValue = React.useMemo(
    () => ({
      authed,
      setAuthed,
    }),
    [authed],
  );

  // return (
  //   <AppContext.Provider value={appContextValue}>
  //     <NavigationContainer>
  //       <StatusBar
  //         animated={true}
  //         backgroundColor="transparent"
  //         translucent={true}
  //       />
  //       {authed ? (
  //         <Tab.Navigator
  //           screenOptions={({route}) => ({
  //             tabBarIcon: ({focused, color, size}) => {
  //               let iconName = '';

  //               if (route.name === 'Home') {
  //                 iconName = focused ? 'home' : 'home-outline';
  //               } else if (route.name === 'Camera') {
  //                 iconName = focused ? 'camera' : 'camera-outline';
  //               } else if (route.name === 'Profile') {
  //                 iconName = focused ? 'person' : 'person-outline';
  //               }
  //               return <Ionicons name={iconName} size={size} color={color} />;
  //             },
  //             tabBarActiveTintColor: 'teal',
  //             tabBarInactiveTintColor: 'gray',
  //             tabBarLabelStyle: {fontSize: 15, bottom: 8},
  //             tabBarStyle: {
  //               height: 70,
  //               margin: 16,
  //               borderRadius: 16,
  //               bottom: 8,
  //               backgroundColor: 'pink',
  //             },
  //           })}>
  //           <Tab.Screen
  //             options={{headerShown: false}}
  //             name="Home"
  //             component={HomeStackScreen}
  //           />
  //           <Tab.Screen
  //             options={{headerShown: false, tabBarHideOnKeyboard: true}}
  //             name="Camera"
  //             component={PostingStackScreen}
  //           />
  //           <Tab.Screen
  //             options={{headerShown: false}}
  //             name="Profile"
  //             component={ProfileStackScreen}
  //           />
  //         </Tab.Navigator>
  //       ) : (
  //         AuthStackScreen()
  //       )}
  //     </NavigationContainer>
  //   </AppContext.Provider>
  // );

  return (
    <AppContext.Provider value={appContextValue}>
      <NavigationContainer>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          translucent={true}
        />
        {authed ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="qrnr" component={HomeTabs} />
            <Stack.Screen
              options={{headerShown: true, title: 'History'}}
              name="Uploads"
              component={UploadScreen}
            />
          </Stack.Navigator>
        ) : (
          AuthStackScreen()
        )}
      </NavigationContainer>
    </AppContext.Provider>
  );
}
