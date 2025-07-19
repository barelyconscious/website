import ImagePreview from './ImagePreview';

import stonequest2d from '../../res/worldsbetween/stonequest_2dgraphics_mar_2013.png'
import stonequestHella from '../../res/worldsbetween/stonequest_may_2013.png'
import { Divider, Typography } from '@mui/material';

export default () => (
    <>
        <Divider sx={{ my: 3, }}>
            <Typography variant='h4'>May 2013</Typography>
        </Divider>

        <p>
            From July 2012 until May 2013, I dedicated several hundred hours working on the game. It was sometime between January and March where I plucked the name StoneQuest out of the air, which was intended to be a working title. And once I gave it a name, it became very real to me and for the first time, I spent more time making a game  than I did playing them. And the game was iterated on constantly. Over spring break, I went home again and implemented 2D graphics. It was surprisingly easy, but the performance was trash. Below is the first screenshot I have of these (terribly over-saturated) graphics:
        </p>

        <Divider sx={{ mb: 3, }}>
            <ImagePreview image={stonequest2d} description="StoneQuest appears" antialias />
        </Divider>

        <p>
            It's painful to look at now and I would have said that then, too. The next things I added were: a minimap; shadow-casting; monsters to fight; interactable objects like chests; loot you could pick up, drop and equip; mouse support; double-buffered rendering to fix the performance issues; a sound engine; and, of course, a revamped UI. Features came and went so quickly and I felt truly inspired passion. This is the most complete StoneQuest had ever been and, regrettably, ever will be:
        </p>

        <Divider sx={{ mb: 3, }}>
            <ImagePreview image={stonequestHella} description="StoneQuest's most complete form" antialias />
        </Divider>
    </>
)
