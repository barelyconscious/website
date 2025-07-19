import ImagePreview from './ImagePreview'

import stonequestLibGdx from '../../res/worldsbetween/stonequest_libgdx.png'
import { Divider, Typography } from '@mui/material'

export default () => (
    <>
        <Divider sx={{ my: 3, }}>
            <Typography variant='h4'>2014</Typography>
        </Divider>

        <p>
            Every good story has an epilogue. Sometimes bad ones do as well. I'll leave it up to you to decide to which category this one belongs. I reworked the UI artwork some more and designed an interface that I really liked and that was easy to parse visually. I explored other options for game engines. I tried out Slick2D and libGDX, both in Java. Here's a screenshot of the implementation of StoneQuest using libGDX with that UI:
        </p>

        <Divider sx={{ maxWidth: '100%', }}>
            <ImagePreview image={stonequestLibGdx} description="StoneQuest implemented in libGDX" antialias />
        </Divider>

        <hr className="rest-onward" />
    </>
)
