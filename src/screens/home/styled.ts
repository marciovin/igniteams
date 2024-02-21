import { Camera } from 'expo-camera';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  align-items: center;
  justify-content: center;
`;

export const CameraPreview = styled(Camera)`
  flex: 1;
`;

export const ButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  align-self: center;
  flex-direction: row;
  justify-content: center;
`;

export const Title = styled.Text`
color: ${({ theme }) => theme.COLORS.GRAY_200};
align-items: center;
`

export const Button = styled.TouchableOpacity`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`;

export const SwitchButton = styled(Button)`
  background-color:${({ theme }) => theme.COLORS.GREEN_500};
`;

export const StopButton = styled(Button)`
  background-color: transparent;
  border-width: 2px;
  border-color: white;
`;

export const Last15Button = styled(Button)`
  background-color: transparent;
  border-width: 2px;
  border-color: white;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const TimerContainer = styled.View`
  position: absolute;
  top: 20px;
  align-self: center;
`;

export const TimerText = styled.Text`
  font-size: 16px;
`;