import stonequest1 from '../../res/worldsbetween/stonequest_july_2012.png'
import ImagePreview from './ImagePreview';
import { Divider, Typography } from '@mui/material';

export default () => (
    <>
        <Divider sx={{ my: 3, }}>
            <Typography variant='h4'>July 2012</Typography>
        </Divider>

        <p>
            With my first semester at UT behind me, I went back to my family for summer vacation and picked up the game again. I threw away the first iteration and after about 100 hours, I had a fully functional game engine upon which I could write the rest of the game. The beauty of roguelikes is that they can be as simple or complex as you want. They're games that you can grow with as a developer.
        </p>

        <Divider sx={{ mb: 3, }}>
            <ImagePreview image={stonequest1} description="Roguelike2 progress, July 2012" />
        </Divider>
    </>
)
