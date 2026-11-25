import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { Button, Card, Snackbar, Text } from 'react-native-paper';

const CHAVE_FAVORITOS = '@meu-app2/favoritos';

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(CHAVE_FAVORITOS)
        .then((dados) => setFavoritos(dados ? JSON.parse(dados) : []))
        .catch(() => setErro('Não foi possível carregar os favoritos.'));
    }, [])
  );

  useEffect(() => {
    fetch('https://ghibliapi.dev/films/')
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Falha ao carregar os filmes.');
        }
        return resposta.json();
      })
      .then(setFilmes)
      .catch(() => setErro('Não foi possível carregar os filmes.'))
      .finally(() => setCarregando(false));
  }, []);

  function alternarFavorito(filme) {
    const jaFavorito = favoritos.some((item) => item.id === filme.id);
    const novosFavoritos = jaFavorito
      ? favoritos.filter((item) => item.id !== filme.id)
      : [...favoritos, filme];

    AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(novosFavoritos))
      .then(() => setFavoritos(novosFavoritos))
      .catch(() => setErro('Não foi possível salvar o favorito.'));
  }

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => router.push('/favoritos')}>
        Ver favoritos ({favoritos.length})
      </Button>
      {carregando && <Text style={styles.texto}>Carregando filmes...</Text>}
      <FlatList
        data={filmes}
        keyExtractor={(filme) => filme.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => {
          const jaFavorito = favoritos.some((filme) => filme.id === item.id);

          return (
            <Card style={styles.cartao}>
              <Card.Title title={item.title} />
              <Card.Actions>
                <Button onPress={() => alternarFavorito(item)}>
                  {jaFavorito ? 'Remover favorito' : 'Favoritar'}
                </Button>
              </Card.Actions>
            </Card>
          );
        }}
      />
      <Snackbar visible={Boolean(erro)} onDismiss={() => setErro('')}>
        {erro}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  lista: { paddingVertical: 12 },
  cartao: { marginBottom: 12 },
  texto: { paddingTop: 16 },
});
