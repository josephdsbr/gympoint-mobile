import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import Background from '~/components/Background';
import {CheckingButton, CheckingContainer} from './styles';

import CheckinItem from '~/components/CheckinItem';

import api from '~/services/api';

export default function Checkin() {
  const {id} = useSelector(state => state.user.profile);
  const [checking, setChecking] = useState([]);

  useEffect(() => {
    async function loadChecking() {
      const response = await api.get(`/students/${id}/checkins`);
      setChecking(response.data);
    }

    loadChecking();
  }, []);

  async function handleSignOut() {
    try {
      await api.post(`/students/${id}/checkings`);
      Alert.alert('Succeso', 'Checkin feito com sucesso');
    } catch (err) {
      Alert.alert('Falha', 'Não conseguimos efetuar seu checking');
    }
  }

  return (
    <Background>
      <CheckingContainer>
        <CheckingButton onPress={handleSignOut}>Novo check-in</CheckingButton>
        {checking.map(x => (
          <CheckinItem id={x.id} data={x} />
        ))}
      </CheckingContainer>
    </Background>
  );
}
Checkin.navigationOptions = {
  tabBarLabel: 'Check-in',
  tabBarIcon: ({tintColor}) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
