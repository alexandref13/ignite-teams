import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { AppRoutes } from './app.routes';
import { useAuth } from '@hooks/useAuth';
import { Login } from '@screens/Login';

export function Routes() {
  const { user } = useAuth();
  const { COLORS } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}>
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <Login />}
      </NavigationContainer>
    </View>
  );
}
