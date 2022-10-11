import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// import MomentUtils from '@date-io/moment'
import { ThemeProvider } from '@mui/material'
// import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import useSettings from 'src/hooks/useSettings'
import { AuthProvider } from 'src/context/JWTAuthContext'
import { createTheme } from 'src/theme'
import routes, { renderRoutes } from 'src/routes'
import { ToastProvider } from './context/ToastContext'

const App = () => {
    const { settings } = useSettings()

    const theme = createTheme({
        direction: settings.direction,
        responsiveFontSizes: settings.responsiveFontSizes,
        theme: settings.theme,
    })

    return (
        <ToastProvider>
            <ThemeProvider theme={theme}>
                {/* <MuiPickersUtilsProvider utils={MomentUtils}> */}
                <Router>
                    <AuthProvider>{renderRoutes(routes)} </AuthProvider>
                </Router>
                {/* </MuiPickersUtilsProvider> */}
            </ThemeProvider>
        </ToastProvider>
    )
}

export default App
