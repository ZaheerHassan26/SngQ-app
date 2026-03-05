import { StyleSheet } from 'react-native';
import Theme from '../../utils/Theme';

const styles = StyleSheet.create({
  modalWrap: {
    flex: 1,
    alignItems: Theme.align,
    justifyContent: Theme.align,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    borderRadius: 10,
    width: Theme.width,
    justifyContent: 'space-evenly',
    padding: 10,
    alignItems: 'center',
    ...Theme.shadow,
  },
  imgLogo: {
    width: Theme.wp('12%'),
    height: Theme.wp('12%'),
  },
  txtLoading: {
    fontSize: Theme.txtMedium,
    color: Theme.primaryColor,
    fontWeight: 'bold',
  },
  indic: {
    margin: '5%',
  },
  toastModalWrap: {
    backgroundColor: Theme.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  imgView: {
    width: Theme.wp('15%'),
    height: Theme.hp('15%'),
  },
});

export default styles;
