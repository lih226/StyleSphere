import { StyleSheet, Image } from "react-native";

type Props = {
  selectedImage: string;
  id?: string;
};

export default function ImageViewer({ selectedImage, id }: Props) {
  return <Image source={{uri: selectedImage}} style={styles.image} id = {id || ''}/>;
}

const styles = StyleSheet.create({
  image: {
    width: 280,
    height: 385,
    borderRadius: 10,
    borderWidth: 1,
  },
});
