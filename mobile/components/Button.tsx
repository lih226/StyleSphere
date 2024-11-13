import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

type Props = {
  label: string;
  id?: string;
  imagePicked?: boolean;
  onPress?: () => void;
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Button({ label, id, imagePicked, onPress }: Props) {
    if (id === 'image') {
        return (
          <View
            id = 'image'
            style={imagePicked ? styles.imageContainer2 : styles.imageContainer1}>
            <Pressable style={[styles.button, { backgroundColor: '#fff' }]} onPress={onPress}>
              {
                !imagePicked && 
                (<>
                  <Ionicons name="image" size={18} color="#25292e" style={{paddingRight: 8}}/> 
                  <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
                </>)
              }
              {
                imagePicked && <Ionicons name="create-outline" size={18} color="#25292e"/> 
              }
            </Pressable>
          </View>
        );
      }
  return (
    <View style={styles.buttonContainer} id = {id || ''}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  imageContainer1: {
    width: 280,
    height: 385,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderWidth: 1,
    borderColor: '#ff',
    borderRadius: 18
  },
  imageContainer2: {
    position: 'absolute',
    left: screenWidth/2 + 50,
    top: screenHeight/2 - 325,
    zIndex: 2,
    width: 50,
    height: 50,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderWidth: 1,
    borderColor: '#ff',
    borderRadius: 18
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#ff',
    fontSize: 16,
  },
});
