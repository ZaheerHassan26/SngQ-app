import {StyleSheet} from 'react-native';
import Theme from '../../../utils/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  timeText: {
    position: 'absolute',
    top: 10,
    left: 20,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
  },
  vipContainer: {
    borderRadius: 4,
    paddingHorizontal: 10,
    // marginLeft: Theme.wp('5'),
  },
  vipText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  diamond: {
    marginVertical: 20,
  },
  unlockText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
  hintsContainer: {
    backgroundColor: '#F6F5F5',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  hintItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  hintText: {
    marginLeft: 10,
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
  },
  subscriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    width: '90%',
  },
  subscriptionItem: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    // borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  selectedSubscription: {
    borderColor: '#FF1493',
    borderWidth: 3,
  },
  subscriptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  subscriptionPrice: {
    fontSize: 14,
    color: 'black',
  },
  button: {
    backgroundColor: '#FF1493',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 70,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#999',
    fontSize: 12,
  },
  footerLink: {
    color: '#FF1493',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  icons: {
    width: 30,
    height: 21,
  },
});
