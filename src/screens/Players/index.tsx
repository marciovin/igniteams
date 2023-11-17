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
import { useRoute } from "@react-navigation/native";

type RouteParams = {
  group: string
}

export function Players(){
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  return (
    <Container>
      <Header showBackButton/>

      <HighLight 
      title={group}
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
    renderItem={({item}) => (  <PlayerCard 
      onRemove={() => {}}
      name={item}
      />)
    }
    ListEmptyComponent={() => (
      <ListEmpty
       message='não há pessoas neste time'
       />
       )}
       showsVerticalScrollIndicator={false}
       contentContainerStyle={[
        { paddingBottom: 100 },
        players.length === 0 && { flex: 1}
       ]}
    />

    <Button 
    title="Remover Turma"
    type="SECONDARY"
    />
    </Container>
  )
} 