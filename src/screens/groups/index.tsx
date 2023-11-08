import { useState } from "react";
import { FlatList } from "react-native";

import { Header } from "../../components/Header";
import { HighLight } from "../../components/heighligth";
import { GroupCard } from "../../components/GroupCard";
import { ListEmpty } from "../../components/ListEmpty";

import { Container } from "./styles";

export function Groups() {
  const [groups, setGroups ] = useState([]); 

  return (
    <Container>
      <Header/>

      <HighLight 
      title="Turmas"
      subtitle="Jogue com sua turma"/>

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem = {({ item }) => (
         <GroupCard 
           title={item}
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
        <ListEmpty
         message='acho que está sem turma 🤔'
         />)}
      />
    </Container>
  );
}