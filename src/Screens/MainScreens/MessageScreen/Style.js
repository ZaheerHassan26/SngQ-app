import {StyleSheet} from 'react-native';
import Theme from '../../../utils/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    marginHorizontal: 16,
    textAlign: 'center',
    color: 'black',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F7F8',
    marginVertical: 2,
    borderRadius: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  messageTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: 'black',
  },
  messageTime: {
    fontSize: 14,
    color: 'grey',
    position: 'absolute',
    right: 0,
  },
  whoSentContainer: {
    backgroundColor: '#8A2BE2',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    width: '80%',
    marginBottom: 26,
    alignSelf: 'center',
  },
  whoSentText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  socialMdia: {
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
  },
});
