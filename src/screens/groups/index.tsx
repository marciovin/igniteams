import { useState, useCallback, useEffect } from "react";
import { Alert, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { HighLight } from "../../components/heighligth";
import { GroupCard } from "../../components/GroupCard";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";

import { Container } from "./styles"
import { groupsGetAll } from "../../storage/group/groupsGetAll";

export function Groups() {
  const [groups, setGroups ] = useState<string[]>([]); 

  const navigation = useNavigation();

    function handleNewgroup() {
      navigation.navigate('new')
    }

      async function fetchGroups() {
        try{
         const data = await groupsGetAll();
         setGroups(data);
        }catch(error){
          console.log(error)
          Alert.alert('Turmas', 'Não foi possivel carregar as Turmas')
        }
      }

      function handleOpenGroup(group: string) {
        navigation.navigate('players', { group });
      }

      useFocusEffect(useCallback(() => {
        fetchGroups();
      },[]));

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
           onPress={() => handleOpenGroup(item)} 
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
        <ListEmpty
         message='acho que está sem turma 🤔'
         />)}
         showsVerticalScrollIndicator={false}
      />

      <Button
      title="Criar nova turma"
      onPress={handleNewgroup}
     />
    </Container>
  );
}