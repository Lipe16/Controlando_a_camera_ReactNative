import React from 'react';
import { Text, View, TouchableOpacity, Vibration, CameraRoll } from 'react-native';
import { Camera, Permissions, ImageManipulator,FileSystem  } from 'expo';

export default class CameraExample extends React.Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photoId:0,
  };


  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { cameraRoll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;


    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {

      return (

        <View style={{ flex: 1 }}>
          <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>

            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>


              <TouchableOpacity
                style={{flex: 0.5, alignSelf: 'flex-end', alignItems: 'center',}}

                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>

                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Trocar de camera{' '}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flex: 0.5, alignSelf: 'flex-end', alignItems: 'center', }}

                onPress={this.snap.bind(this)}>

                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Tirar foto{' '}
                </Text>
              </TouchableOpacity>
            </View>

          </Camera>
        </View>
      );
    }
  }




      snap  = async ()=>{
        if (this.camera) {

            let photo = await this.camera.takePictureAsync();

            await CameraRoll.saveToCameraRoll(photo.uri, 'photo');

            Vibration.vibrate();
        }
    };

}
