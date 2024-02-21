import { Audio } from "expo-av";
import { Camera, CameraType } from "expo-camera";
import { useRef, useState, useEffect } from "react";
import {
  Container, CameraPreview, ButtonContainer,
  Button, SwitchButton, StopButton,
  Last15Button, ButtonText, TimerContainer,
  TimerText
} from "./styled";
import { Permissions } from 'expo-permissions';

export function Home() {
  const cameraRef = useRef<Camera>(null);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedAudio, setRecordedAudio] = useState<Audio.Recording | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [canRecordLast15Seconds, setCanRecordLast15Seconds] = useState(false);

  const AudioPermissions = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

      if (status === 'granted') {
        // Permissão concedida, inicie a gravação de áudio
      } else {
        // Permissão negada
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão de gravação de áudio:', error);
    }
  };


  useEffect(() => {
    startRecording();
  }, []);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (isRecording) {
      timerInterval = setInterval(() => {
        setRecordingTime(time => time + 1);
        if (recordingTime >= 25) {
          setCanRecordLast15Seconds(true);
        }
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [isRecording, recordingTime]);

  const startRecording = async () => {
    try {
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
      setTimeout(stopRecording, 15000);
    } catch (error) {
      console.error('Falha ao iniciar', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        setRecordedAudio(recording);
        setRecording(null);
        setIsRecording(false);
      }
    } catch (error) {
      console.error('Falha ao parar gravação', error);
    }
  };

  const handleCameraPermission = async () => {
    const { status } = await Camera.getCameraPermissionsAsync();
    if (status === 'granted') {
      // Permissão concedida
    } else {
      console.error('Permissão para a câmera não foi concedida');
    }
  };

  const switchCameraType = () => {
    setCameraType(prevCameraType =>
      prevCameraType === CameraType.back
        ? CameraType.front
        : CameraType.back
    );
  };

  const recordLast15Seconds = () => {
    // Lógica para gravar os últimos 15 segundos que não fiz
  };

  return (
    <Container>
      <CameraPreview
        type={cameraType}
        ref={cameraRef}
        onCameraReady={handleCameraPermission}
      />
      <ButtonContainer>
        {isRecording ? (
          <StopButton onPress={stopRecording}>
            <ButtonText>Parar</ButtonText>
          </StopButton>
        ) : (
          <Button onPress={startRecording}>
            <ButtonText>Iniciar Gravação</ButtonText>
          </Button>
        )}
        {canRecordLast15Seconds && (
          <Last15Button onPress={recordLast15Seconds}>
            <ButtonText>15s</ButtonText>
          </Last15Button>
        )}
        <SwitchButton onPress={switchCameraType}>
          <ButtonText>Trocar Câmera</ButtonText>
        </SwitchButton>
      </ButtonContainer>
      <TimerContainer>
        <TimerText>Tempo de Gravação: {recordingTime}s</TimerText>
      </TimerContainer>
    </Container>
  );
}