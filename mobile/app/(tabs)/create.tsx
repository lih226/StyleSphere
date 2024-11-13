import { View, StyleSheet, TextInput } from 'react-native';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const ipAddress = 'localhost';
const PlaceholderImage = require('@/assets/images/splash.png');
let id = 0;

interface PostItem {
  id: string; //uuid type
  uri: string;
  media_type: string;
  description: string;
  username: string;
}

export default function CreateScreen() {
  //Either an uri of the image or undefined (empty)
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [blobUrl, setBlobUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [imagePicked, setImagePicked] = useState(false);

  useFocusEffect(() => {
    // if(blobUrl){
    //   toggleImagePicked()
    //   setBlobUrl('');
    // }
    // setDescription('');
  });

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      //Aspect doesn't work on Apple
      aspect: [8, 11],
    });

    if (!result.canceled) {
      if(!blobUrl){
        toggleImagePicked();
      }

      //Pick the first assest from assests array. We are only selecting one image.
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);

      // Convert image to Blob
      const response = await fetch(imageUri);
      const blob = await response.blob();
      setBlobUrl(URL.createObjectURL(blob));
    } else {
      alert('You did not select any image.');
    }
  };

  const uploadImage = () => {
    if(!blobUrl){
      alert('No image');
      return;
    }
    if(!description){
      alert('No description');
      return;
    }

    const newPost = {uri: blobUrl || '', media_type: 'image', description: description, username: 'silspade'};

    axios.post('http://' + ipAddress + ':3000/posts', newPost)
      .then(response => {
        console.log('Post added:', response.data);
        alert('Image uploaded!');
      })
      .catch(error => {
        setError(error.message);
        alert(`Error uploading image\nError Message: ${error.message}`);
      });
      setBlobUrl('');
      setDescription('');
      toggleImagePicked();
  };

  const toggleImagePicked = () => {
    setImagePicked(!imagePicked);
  }

  return (
    <View style={styles.container}>
      <Button id="image" label="Choose an Image" imagePicked={imagePicked} onPress={pickImageAsync}/>
      {blobUrl && <ImageViewer selectedImage={blobUrl}/>}
      <TextInput value={description} onChangeText={setDescription} placeholder="Description" style={styles.input}/>
      <Button label="Post Image" onPress={uploadImage}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFAFF',
  },
  imageContainer: {
    alignItems: 'center',
  },
  text: {
    color: '#ff',
  },
  input: {
    borderWidth: 1,
    height: 30,
    width: 300,
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
  }
});
