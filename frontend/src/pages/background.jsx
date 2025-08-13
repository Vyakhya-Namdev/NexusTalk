import { Box } from '@mui/material'
import React from 'react'

export default function Background() {
    return (
        <Box
            sx={{
                backgroundImage: `url("https://images.unsplash.com/photo-1633113214698-485cdb2f56fd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
                backgroundRepeat: 'no-repeat',
                // backgroundColor: (t) =>
                //     t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                // backgroundSize: 'contain', // or 'cover'
                backgroundPosition: 'center right', // right align
                backgroundAttachment: 'scroll',
                height: '100%',
                width: '100%',
            }}
        ></Box>

    )
}