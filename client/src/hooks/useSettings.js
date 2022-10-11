import { useContext } from 'react'
import SettingsContext from 'src/context/SettingsContext'

const useSettings = () => useContext(SettingsContext)

export default useSettings
