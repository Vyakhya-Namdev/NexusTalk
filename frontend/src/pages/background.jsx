import { Box } from '@mui/material'
import React from 'react'

export default function Background() {
    return (
        <Box
            sx={{
                backgroundImage: `url("/images/auth-img.webp")`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'contain', // or 'cover'
                backgroundPosition: 'center right', // right align
                backgroundAttachment: 'scroll',
                height: '100%',
                width: '100%',
            }}
        ></Box>

    )
}
