import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const { width, height } = Dimensions.get('window');

type Props = {
  img: string;
  description: string;
};

export default function PostImage({ img, description }: Props) {
  return (
    <View style={styles.container}>
        <Image source={{uri: img}} style={styles.image} />
        <Text style={styles.text}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width / 2 - 20,
    height: (width / 2 - 20) * 11 / 8,
    borderRadius: 18,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10
  },
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  }
});
