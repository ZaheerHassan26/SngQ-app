import {StyleSheet} from 'react-native';
import Theme from '../../../utils/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  setView: {
    alignSelf: 'center',
    width: '90%',
  },
  askContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  askText: {
    color: 'black',
    fontSize: Theme.wp('5'),
    fontWeight: 'bold',
  },
  gearIcon: {
    position: 'absolute',
    right: 0,
  },
  secondMainContainer: {
    height: 300,
    width: '100%',
    marginTop: Theme.wp('13'),
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowButton: {
    borderRadius: 100,
    backgroundColor: '#EEEEEE',
    padding: 3,
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
  linkContainer: {
    width: '100%',
    backgroundColor: '#EEEEEE',
    marginTop: Theme.wp('8'),
    borderRadius: 20,
    padding: 10,
  },
  // New styles for the modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000, // Ensure the modal appears on top
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    paddingVertical: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'grey',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#ccc',
  },
  modalButtonDelete: {
    backgroundColor: 'red',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
