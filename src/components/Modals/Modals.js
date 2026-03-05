import React from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Theme from '../../utils/Theme';

function Modals(props) {
  const {loader, loaderIndicator} = props;
  return (
    <>
      {loaderIndicator === true ? (
        <Modal
          isVisible={loader}
          style={{margin: 0}}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          deviceHeight={Theme.hp('100%')}
          deviceWidth={Theme.wp('100%')}
          animationInTiming={200}
          animationOutTiming={200}
          avoidKeyboard>
          {loader && <StatusBar backgroundColor="#000000B2" />}
          <View style={styles.container}>
            <ActivityIndicator size="large" color={Theme.primaryColor} />
          </View>
        </Modal>
      ) : null}
    </>
  );
}
export default Modals;

const styles = StyleSheet.create({
  container: {
    width: Theme.wp('20%'),
    height: Theme.hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.white,
    marginLeft: 5,
    borderRadius: 5,
    alignSelf: 'center',
  },
});
