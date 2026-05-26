import '../styles/App.css';
import { Box, Divider, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import skGamejam from '../res/scriptkitties/Screenshot 2024-03-22 184347.png';
import skCombat2 from '../res/scriptkitties/Screenshot 2024-08-12 094439.png';
import rng from '../res/scriptkitties/connected areas.png';
import rngWorld from '../res/scriptkitties/Screenshot 2024-07-14 172338.png';
import dialog from '../res/scriptkitties/dialog.png';

const Blog20250719 = () => {
    return (
        <Box sx={{ m: 10, mt: 5, }}>
            <Divider sx={{ mb: 2, }}>
                <Typography variant='h4'>Jul 19, 2025</Typography>
                <Typography sx={{ fontStyle: 'italic', }}>a brief retrospective</Typography>
            </Divider>
            <Typography>
                What do people who have nothing to say write about? Lorem ipsum springs to mind, but that's hardly worth your time to read let alone my time to copy-paste. Let's start with introductions and see where that gets us:
            </Typography>
            <Divider sx={{ my: 2, }} />
            <Typography>
                Among other things, I'm the sole developer of <Link className="fancy-link" to="/script-kitties">Script Kitties</Link>, the action strategy creature collector with deep turn-based combat.
                Script Kitties started in March 2024, when I decided to kick off a 2-day game jam with everyone I knew. Only 1 person showed up, but other people might have if I told them about it.
            </Typography>
            <Typography sx={{ my: 2, }}>
                This is how it turned out:
            </Typography>

            <img className='responsive-image' src={skGamejam} />

            <Typography sx={{ my: 2, }}>
                Completing what I set out to do initially, I decided to turn it into something actually worth playing. Mostly, I was just enjoying programming again but after a few months, I started seeing a real game. I expanded existing systems, like rendering sprites flush with color, and added party-based combat to make things a bit more interesting.
            </Typography>

            <img className='responsive-image' src={skCombat2} />

            <Typography sx={{ my: 2, }}>
                The world was originally randomly generated across 7 biomes.
            </Typography>

            <img style={{ width: '50%', display: 'inline-block', }} className='responsive-image' src={rngWorld} />
            <img style={{ width: '50%', display: 'inline-block', }} className='responsive-image' src={rng} />

            <Typography sx={{ my: 2, }}>
                It turned out okay, and it was a lot of fun to implement, but I knew it would be difficult to get right and chose to pivot to a hand-crafted world that felt more connected.
            </Typography>

            <img className='responsive-image' src={dialog} />

            <Divider sx={{ mb: 5 }} />
        </Box>
    );
};

export default Blog20250719;
