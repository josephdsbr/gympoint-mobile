import React, {useEffect, useState} from 'react';

import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  AnswerBody,
  AnswerHeader,
  AnswerStatus,
  AnswerTime,
  AnswerContent,
  AccessButton,
} from './styles';

import api from '~/services/api';
import AnswerItem from '~/components/AnswerItem';
import Background from '~/components/Background';

export default function List({navigation}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadQuestion() {
      const response = await api.get(`/students/1/help-others`);
      setData(response.data);
    }

    loadQuestion();
  }, []);

  function handlePass() {
    navigation.navigate('Answer', {id: data.student_id});
  }

  return (
    <Background>
      <Container>
        <AccessButton onPress={handlePass}>Novo pedido de auxílio</AccessButton>
        {data.map(x => (
          <AnswerItem data={x} navigation={navigation} />
        ))}
      </Container>
    </Background>
  );
}

List.navigationOptions = {
  headerLeft: () => (
    <TouchableOpacity onPress={() => {}}>
      <Icon name="chevron-left" size={20} color="red" />
    </TouchableOpacity>
  ),
};
