import {Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')

export function ScreenWidth(multiplicador = 1){
    return width * multiplicador + 'px'
}

export function ScreenHeight(multiplicador = 1){
    console.log(height * multiplicador + 'px')
    return height * multiplicador + 'px'
}
