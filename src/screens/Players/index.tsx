import { HighLight } from "../../components/heighligth";
import { FlatList } from 'react-native'
import { Header } from "../../components/Header";
import { ButtonIcon } from '../../components/ButtonIcon/index'
import { Filter } from '../../components/Filter/index'

import { Container, Form, HearderList, NumbersofPlayers } from "./styles";
import { Input } from "../../components/Input";
import { useState } from "react";
import { PlayerCard } from "../../components/PlayerCard";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";

export function Players(){
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([['macaw', 'william']]);

  return (
    <Container>
      <Header showBackButton/>

      <HighLight 
      title="Nome da turma"
      subtitle="adicione a galera e separe os times"
      />

      <Form>
      <Input
      placeholder="Nome da pessoa"
      autoCorrect={false}
      />

      <ButtonIcon icon="add" />
      </Form>

        <HearderList>
        <FlatList
        data={['Time A', 'Time B']}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Filter
          title={item}
          isActive={item === team}
          
          onPress={() => setTeam(item)}
          />
        )}
        horizontal
        />

          <NumbersofPlayers>
              {players.length}
          </NumbersofPlayers>

   </HearderList>
          
    <FlatList
    data={players}
    keyExtractor={ item => item}
    renderItem={({item}) => (
      <PlayerCard 
      name={item}
      />
    )}

    />
    </Container>
  )
} 