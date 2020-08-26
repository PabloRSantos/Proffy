import Constants from 'expo-constants'
import {Platform} from 'react-native'

const statusBarHeight =
    Platform.OS === 'android' ? Constants.statusBarHeight : 0

export default statusBarHeight