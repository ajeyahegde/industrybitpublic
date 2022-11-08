import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-block">
            <CircularProgress
                {...props}
                value={100}
                style={{ color: '#eeeeee' }}
            />
            <CircularProgress
                {...props}
                style={{
                    position: 'absolute',
                    left: 0,
                }}
            />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="textSecondary"
                >
                    {/*Zero is falsy, so check the type instead*/}
                    {`${
                        typeof props.label !== 'undefined'
                            ? props.label
                            : Math.round(props.value)
                    }`}
                </Typography>
            </Box>
        </Box>
    )
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     */
    label: PropTypes.number,
    value: PropTypes.number.isRequired,
}

export default CircularProgressWithLabel
