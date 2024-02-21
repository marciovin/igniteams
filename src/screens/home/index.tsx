import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { Container } from './styled';

export function Home() {
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    if (cameraRef.current && !isRecording) {
      try {
        setIsRecording(true);
        await cameraRef.current.startRecording();
        console.log('Recording started');
      } catch (error) {
        console.error('Failed to start recording:', error);
        setIsRecording(false);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      try {
        await cameraRef.current.stopRecording();
        console.log('Recording stopped');
        setIsRecording(false);
      } catch (error) {
        console.error('Failed to stop recording:', error);
      }
    }
  };

  return (
    <Container>
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        video={true}
        device="back"
        isActive={true}
      />
      <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
        {isRecording ? (
          <TouchableOpacity onPress={stopRecording}>
            <Text style={{ fontSize: 20, color: 'red' }}>Stop Recording</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startRecording}>
            <Text style={{ fontSize: 20, color: 'green' }}>Start Recording</Text>
          </TouchableOpacity>
        )}
      </View>
    </Container>
  );
}
