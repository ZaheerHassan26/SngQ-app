import {StyleSheet} from 'react-native';
import Theme from '../../utils/Theme';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBox: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 20,

    backgroundColor: 'pink',
    marginTop: 30,
    alignSelf: 'center',
    height: Theme.wp('40'),
    padding: 10,
  },
  boxText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    margin: 10,
    borderRadius: 100,
    overflow: 'hidden',
    width: 35,
    height: 35,
    alignItems: 'center',
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: '#000',
  },
  buttonGradient: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  linkContainer: {
    width: '110%',
    backgroundColor: '#EEEEEE',
    marginTop: 30,
    borderRadius: 20,
    padding: 15,
    alignSelf: 'center',
  },
  secondMainContainer: {
    height: 300,
    width: '100%',
    marginTop: Theme.wp('5'),
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: '28%',
  },
  arrowButton: {
    borderRadius: 100,
    flexDirection: 'row',
  },
  questionContainer: {
    flexDirection: 'row',
    marginLeft: Theme.wp('8'),
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  questionText: {
    color: 'black',
    fontSize: Theme.wp('4.5'),
    marginLeft: Theme.wp('1'),
    paddingHorizontal: 5,
    fontWeight: '600',
  },
});
