import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { keyframes } from '@mui/material/styles';
import CasinoIcon from '@mui/icons-material/Casino';
import StopIcon from '@mui/icons-material/Stop';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import PrintIcon from '@mui/icons-material/Print';
import Footer from '../components/Footer';
import { usePageTitle } from '../hooks/usePageTitle';
import { colors, RADIUS } from '../theme/colors';

/** Dark board so the dice read from the back of a lecture hall. */
const board = {
  face: colors.charcoal,
  deep: colors.bayNavy,
  ink: '#161E24',
  cream: colors.cream,
  creamDim: 'rgba(247, 240, 230, 0.62)',
};

type GameSymbol = { id: string; name: string; glyph: string };

const SYMBOLS: GameSymbol[] = [
  { id: 'gourd', name: 'Gourd', glyph: '🍈' },
  { id: 'crab', name: 'Crab', glyph: '🦀' },
  { id: 'shrimp', name: 'Shrimp', glyph: '🦐' },
  { id: 'fish', name: 'Fish', glyph: '🐟' },
  { id: 'rooster', name: 'Rooster', glyph: '🐓' },
  { id: 'tiger', name: 'Tiger', glyph: '🐅' },
];

const TWISTS: { name: string; text: string }[] = [
  {
    name: 'House cut',
    text: 'Each winning spot pays one chip to the person running the game.',
  },
  {
    name: 'Double or nothing',
    text: 'Wins pay double. A loss costs two chips.',
  },
  {
    name: 'Tiger is closed',
    text: 'The tiger is closed. Five spots this round.',
  },
  {
    name: 'Blind bet',
    text: 'Eyes closed. Walk to a spot without looking at where anyone else went.',
  },
  {
    name: 'Stay put',
    text: 'No moving. Keep the spot you had last round. Wins pay double.',
  },
  {
    name: 'Crowd tax',
    text: 'Count heads before the shake. The spot with the most people pays nothing.',
  },
  {
    name: 'Solo spot',
    text: 'A spot with exactly one person at it pays triple.',
  },
  {
    name: 'Pick-up',
    text: 'One person from a losing spot can join a winning spot. The winning spot picks who.',
  },
];

const MODE_HINT = {
  knockout: 'Lose and you are out. Play until one person is left.',
  chips: 'Five chips each. Wins pay one chip per matching die, losses cost one.',
} as const;

type Mode = keyof typeof MODE_HINT;
type Phase = 'bets' | 'shaking' | 'result';

const rattle = keyframes`
  0% { transform: translateX(-50%) rotate(-1.5deg) translateY(0); }
  25% { transform: translateX(-50%) rotate(1.4deg) translateY(-5px); }
  50% { transform: translateX(-50%) rotate(-1.1deg) translateY(2px); }
  75% { transform: translateX(-50%) rotate(1.7deg) translateY(-3px); }
  100% { transform: translateX(-50%) rotate(-1.5deg) translateY(0); }
`;

/** Faces sit around a cube in SYMBOLS order; FACE_ANGLE spins one of them to the front. */
const FACE_PLACE = [
  '',
  'rotateY(90deg)',
  'rotateY(180deg)',
  'rotateY(-90deg)',
  'rotateX(90deg)',
  'rotateX(-90deg)',
];

const FACE_ANGLE = [
  { x: 0, y: 0 },
  { x: 0, y: -90 },
  { x: 0, y: 180 },
  { x: 0, y: 90 },
  { x: -90, y: 0 },
  { x: 90, y: 0 },
];

const faceTransform = (face: number) =>
  `rotateX(${FACE_ANGLE[face].x}deg) rotateY(${FACE_ANGLE[face].y}deg)`;

/** What the dice show before the first shake. */
const REST_FACES = [1, 3, 4];

/** Unbiased 0-5 from the browser's crypto, with a plain fallback. */
function rollDie() {
  const crypto = window.crypto;
  if (crypto && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    const limit = 4294967296 - (4294967296 % 6);
    for (let i = 0; i < 24; i += 1) {
      crypto.getRandomValues(buf);
      if (buf[0] < limit) return buf[0] % 6;
    }
  }
  return Math.floor(Math.random() * 6);
}

const Game = () => {
  usePageTitle('Six Corners');

  const [round, setRound] = useState(1);
  const [phase, setPhase] = useState<Phase>('bets');
  const [roll, setRoll] = useState<number[] | null>(null);
  const [bowlUp, setBowlUp] = useState(false);
  const [mode, setMode] = useState<Mode>('knockout');
  const [twistsOn, setTwistsOn] = useState(false);
  const [twist, setTwist] = useState<{ name: string; text: string } | null>(null);
  const [history, setHistory] = useState<number[][]>([]);
  const [signIndex, setSignIndex] = useState<number | null>(null);
  const [isFull, setIsFull] = useState(false);

  const deck = useRef<{ name: string; text: string }[]>([]);
  const timers = useRef<number[]>([]);
  const dieRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cubeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const anims = useRef<Animation[]>([]);
  const ledgerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    anims.current.forEach((animation) => animation.cancel());
    anims.current = [];
    cubeRefs.current.forEach((cube) => {
      if (cube) cube.style.transform = '';
    });
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const toggleFullscreen = useCallback(() => {
    const node = stageRef.current as
      | (HTMLDivElement & { webkitRequestFullscreen?: () => void })
      | null;
    if (!node) return;
    const doc = document as Document & {
      webkitFullscreenElement?: Element | null;
      webkitExitFullscreen?: () => void;
    };
    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      else doc.webkitExitFullscreen?.();
      return;
    }
    if (node.requestFullscreen) node.requestFullscreen().catch(() => {});
    else node.webkitRequestFullscreen?.();
  }, []);

  useEffect(() => {
    const onChange = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element | null };
      setIsFull(Boolean(doc.fullscreenElement || doc.webkitFullscreenElement));
    };
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
    };
  }, []);

  const drawTwist = useCallback((enabled: boolean) => {
    if (!enabled) {
      setTwist(null);
      return;
    }
    if (deck.current.length === 0) deck.current = [...TWISTS];
    const pick = Math.floor(Math.random() * deck.current.length);
    setTwist(deck.current.splice(pick, 1)[0]);
  }, []);

  const shake = useCallback(() => {
    if (phase === 'shaking') return;
    clearTimers();
    setRoll(null);
    setBowlUp(false);
    setPhase('shaking');
  }, [clearTimers, phase]);

  const stopShake = useCallback(() => {
    if (phase !== 'shaking') return;

    const result = [rollDie(), rollDie(), rollDie()];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const step = reduceMotion ? 0 : 170;
    const fallMs = reduceMotion ? 0 : 620;

    setBowlUp(true);

    result.forEach((face, i) => {
      const cube = cubeRefs.current[i];
      const die = dieRefs.current[i];
      const shadow = shadowRefs.current[i];
      const angle = FACE_ANGLE[face];

      if (reduceMotion || !cube || !die) {
        if (cube) cube.style.transform = faceTransform(face);
        return;
      }

      const delay = step * i;
      const tilt = i === 1 ? -8 : i === 2 ? 7 : 0;

      anims.current.push(
        die.animate(
          [
            { transform: 'translate3d(0, -170px, 0)', opacity: 0, offset: 0 },
            { transform: 'translate3d(0, -140px, 0)', opacity: 1, offset: 0.14 },
            {
              transform: 'translate3d(0, 0, 0)',
              offset: 0.6,
              easing: 'cubic-bezier(0.45, 0, 0.75, 1)',
            },
            { transform: 'translate3d(0, -22px, 0)', offset: 0.78 },
            { transform: 'translate3d(0, 0, 0)', offset: 0.92 },
            { transform: 'translate3d(0, -5px, 0)', offset: 0.97 },
            { transform: 'translate3d(0, 0, 0)', offset: 1 },
          ],
          { duration: fallMs, delay, easing: 'ease-in', fill: 'both' },
        ),
      );

      anims.current.push(
        cube.animate(
          [
            {
              transform: `rotateZ(${tilt - 24}deg) rotateX(${angle.x - 1080}deg) rotateY(${angle.y - 900}deg)`,
            },
            { transform: `rotateZ(${tilt}deg) rotateX(${angle.x}deg) rotateY(${angle.y}deg)` },
          ],
          {
            duration: fallMs + 90,
            delay,
            easing: 'cubic-bezier(0.17, 0.72, 0.24, 1)',
            fill: 'both',
          },
        ),
      );

      if (shadow) {
        anims.current.push(
          shadow.animate(
            [
              { transform: 'translateX(-50%) scale(0.45)', opacity: 0.05 },
              { transform: 'translateX(-50%) scale(1)', opacity: 0.34 },
            ],
            { duration: fallMs, delay, easing: 'ease-in', fill: 'both' },
          ),
        );
      }
    });

    timers.current.push(
      window.setTimeout(
        () => {
          setRoll(result);
          setPhase('result');
          setHistory((prev) => [...prev, result]);
        },
        step * 2 + fallMs,
      ),
    );
  }, [phase]);

  const nextRound = useCallback(() => {
    clearTimers();
    setRound((r) => r + 1);
    setPhase('bets');
    setRoll(null);
    setBowlUp(false);
    drawTwist(twistsOn);
  }, [clearTimers, drawTwist, twistsOn]);

  const newGame = useCallback(() => {
    clearTimers();
    setRound(1);
    setPhase('bets');
    setRoll(null);
    setBowlUp(false);
    setHistory([]);
    deck.current = [];
    drawTwist(twistsOn);
  }, [clearTimers, drawTwist, twistsOn]);

  const advance = useCallback(() => {
    if (phase === 'result') nextRound();
    else if (phase === 'shaking') stopShake();
    else shake();
  }, [nextRound, phase, shake, stopShake]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName ?? '';
      if (tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (signIndex !== null) return;
      if (event.key === ' ') {
        event.preventDefault();
        advance();
      } else if (event.key === 'r' || event.key === 'R') {
        newGame();
      } else if (event.key === 'f' || event.key === 'F') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [advance, newGame, signIndex, toggleFullscreen]);

  useEffect(() => {
    const node = ledgerRef.current;
    if (node) node.scrollLeft = node.scrollWidth;
  }, [history]);

  const tally = SYMBOLS.map((_, i) =>
    history.reduce((sum, r) => sum + r.filter((face) => face === i).length, 0),
  );
  const winners = roll ? Array.from(new Set(roll)) : [];
  const dieSize = isFull ? { xs: 76, sm: 110, md: 136 } : { xs: 68, sm: 84, md: 96 };
  const glyphSize = isFull ? { xs: '2.4rem', md: '3.6rem' } : { xs: '2rem', md: '2.6rem' };
  const dieFace = (i: number) => (roll ? roll[i] : REST_FACES[i]);

  let kicker = 'Bowl down';
  let call = 'Place your bets.';
  if (phase === 'shaking') {
    kicker = 'Shaking';
    call = 'Stop when the bets are in.';
  } else if (phase === 'result' && roll) {
    kicker =
      mode === 'chips'
        ? `${winners.length} of 6 spots get paid`
        : `${winners.length} of 6 spots survive`;
    call =
      winners.length === 1
        ? `${SYMBOLS[winners[0]].name} ×3`
        : roll.map((face) => SYMBOLS[face].name).join(' · ');
  }

  return (
    <Box>
      <Box
        sx={{
          bgcolor: board.ink,
          color: board.cream,
          borderBottom: `4px solid ${colors.pink}`,
          py: { xs: 5, md: 7 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{
              color: colors.gold,
              display: 'inline-block',
              border: `1.5px solid ${colors.gold}`,
              borderRadius: `${RADIUS}px`,
              px: 1.1,
              py: 0.4,
              mb: 2,
            }}
          >
            Fall GM · Sept 17 · Wheeler 130
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: board.cream,
              fontSize: { xs: '2.6rem', md: '3.4rem' },
              mb: 1.75,
            }}
          >
            Six Corners
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(247,240,230,0.85)', maxWidth: 580 }}>
            Four corners, played with three dice. Six symbols go up around the room, everyone
            stands at one, and the dice decide who is still in. Runs off the space bar on a
            projector.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          ref={stageRef}
          sx={{
            ...(isFull && {
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'safe center',
              gap: 2,
              overflowY: 'auto',
              bgcolor: 'background.default',
              p: { xs: 2, md: 4 },
            }),
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            useFlexGap
            flexWrap="wrap"
            alignItems="center"
            sx={{ mb: 2.5 }}
          >
            <Box
              sx={{
                fontFamily: '"Fraunces", serif',
                fontWeight: 700,
                fontSize: '1.05rem',
                bgcolor: colors.charcoal,
                color: colors.cream,
                px: 1.5,
                py: 0.5,
                borderRadius: `${RADIUS}px`,
              }}
            >
              Round {round}
            </Box>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={mode}
              onChange={(_, value: Mode | null) => value && setMode(value)}
              aria-label="Scoring"
            >
              <ToggleButton value="knockout">Knockout</ToggleButton>
              <ToggleButton value="chips">Chips</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButton
              size="small"
              value="twists"
              selected={twistsOn}
              onChange={() => {
                const next = !twistsOn;
                setTwistsOn(next);
                drawTwist(next);
              }}
            >
              Twists
            </ToggleButton>
            <Button
              size="small"
              variant="outlined"
              startIcon={isFull ? <FullscreenExitIcon /> : <FullscreenIcon />}
              onClick={toggleFullscreen}
              sx={{ color: 'text.secondary', borderColor: 'divider' }}
            >
              {isFull ? 'Exit full screen' : 'Full screen'}
            </Button>
            <Typography variant="body2" color="text.secondary">
              {MODE_HINT[mode]}
            </Typography>
          </Stack>

          <Box
            sx={{
              background: `linear-gradient(180deg, ${board.face} 0%, ${board.deep} 100%)`,
              border: `3px solid ${colors.gold}`,
              borderRadius: `${RADIUS}px`,
              boxShadow: 'inset 0 0 0 5px rgba(247,240,230,0.1)',
              px: { xs: 2, md: 3 },
              py: { xs: 3, md: 4 },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                height: isFull ? { xs: 220, md: 320 } : { xs: 200, md: 236 },
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 0,
                  transform: 'translateX(-50%)',
                  width: isFull ? { xs: '94%', md: 620 } : { xs: '92%', md: 430 },
                  height: 112,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(ellipse at 50% 32%, #FFFDF8 0%, #F2E9DA 58%, #CFC3B0 100%)',
                  boxShadow: '0 10px 26px rgba(0,0,0,0.35)',
                }}
              />

              <Stack
                direction="row"
                spacing={{ xs: 1.25, md: 3 }}
                sx={{ position: 'relative', mb: 3.5, opacity: bowlUp ? 1 : 0 }}
                aria-live="polite"
              >
                {[0, 1, 2].map((i) => (
                  <Box key={i} sx={{ position: 'relative', width: dieSize, aspectRatio: '1' }}>
                    <Box
                      aria-hidden
                      ref={(node: HTMLDivElement | null) => {
                        shadowRefs.current[i] = node;
                      }}
                      sx={{
                        position: 'absolute',
                        left: '50%',
                        bottom: -12,
                        width: '84%',
                        height: 13,
                        transform: 'translateX(-50%)',
                        borderRadius: '50%',
                        bgcolor: 'rgba(28, 22, 18, 0.5)',
                        filter: 'blur(5px)',
                        opacity: 0.34,
                      }}
                    />
                    <Box
                      ref={(node: HTMLDivElement | null) => {
                        dieRefs.current[i] = node;
                      }}
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        perspective: isFull ? '1500px' : '1100px',
                      }}
                    >
                      <Box
                        ref={(node: HTMLDivElement | null) => {
                          cubeRefs.current[i] = node;
                        }}
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          transformStyle: 'preserve-3d',
                          transform: faceTransform(dieFace(i)),
                        }}
                      >
                        {SYMBOLS.map((symbol, f) => (
                          <Box
                            key={symbol.id}
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: glyphSize,
                              lineHeight: 1,
                              borderRadius: `${RADIUS + 2}px`,
                              background: `linear-gradient(155deg, ${colors.paper} 0%, #EDE1CD 100%)`,
                              border: '1px solid rgba(44, 53, 57, 0.16)',
                              boxShadow: 'inset 0 -12px 20px rgba(44, 53, 57, 0.14)',
                              backfaceVisibility: 'hidden',
                              transform: {
                                xs: `${FACE_PLACE[f]} translateZ(${dieSize.xs / 2}px)`,
                                sm: `${FACE_PLACE[f]} translateZ(${dieSize.sm / 2}px)`,
                                md: `${FACE_PLACE[f]} translateZ(${dieSize.md / 2}px)`,
                              },
                            }}
                          >
                            {symbol.glyph}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 12,
                  transform: 'translateX(-50%)',
                  width: isFull ? { xs: '80%', md: 480 } : { xs: '74%', md: 300 },
                  height: isFull ? 220 : 164,
                  borderRadius: isFull ? '240px 240px 30px 30px' : '150px 150px 26px 26px',
                  background: `linear-gradient(175deg, ${colors.paper} 0%, #F0E5D3 55%, #C9BCA8 100%)`,
                  boxShadow: 'inset 0 -14px 26px rgba(0,0,0,0.15), 0 14px 26px rgba(0,0,0,0.35)',
                  zIndex: 2,
                  transition: 'transform 0.55s cubic-bezier(0.3,0.8,0.3,1), opacity 0.45s ease',
                  animation:
                    phase === 'shaking' && !bowlUp ? `${rattle} 0.18s linear infinite` : 'none',
                  ...(bowlUp && {
                    transform:
                    'translateX(-50%) translateY(-96px) perspective(900px) rotateX(-24deg) scale(1.06)',
                    opacity: 0,
                  }),
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: '50%',
                    top: 14,
                    transform: 'translateX(-50%)',
                    width: 54,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.6)',
                  },
                }}
              />
            </Box>

            <Box sx={{ textAlign: 'center', mb: 2.5, minHeight: 78 }}>
              <Typography
                variant="overline"
                sx={{ color: board.creamDim, letterSpacing: '0.18em', display: 'block' }}
              >
                {kicker}
              </Typography>
              <Typography
                variant="h3"
                component="p"
                sx={{
                  color: board.cream,
                  fontSize: isFull ? { xs: '2rem', md: '3.2rem' } : { xs: '1.6rem', md: '2.2rem' },
                  mt: 0.5,
                }}
              >
                {call}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} justifyContent="center" flexWrap="wrap" useFlexGap>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={phase === 'shaking' ? <StopIcon /> : <CasinoIcon />}
                onClick={advance}
                sx={{ fontWeight: 700 }}
              >
                {phase === 'result' ? 'Next round' : phase === 'shaking' ? 'Stop' : 'Shake'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={newGame}
                sx={{
                  color: board.cream,
                  borderColor: 'rgba(247,240,230,0.4)',
                  '&:hover': { borderColor: colors.gold, bgcolor: 'rgba(247,240,230,0.08)' },
                }}
              >
                New game
              </Button>
            </Stack>

            <Typography
              variant="caption"
              sx={{ display: 'block', textAlign: 'center', mt: 1.5, color: board.creamDim }}
            >
              Space: shake, stop, next round. F: full screen. R: reset.
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 2,
              display: 'grid',
              gridTemplateColumns: isFull
                ? { xs: 'repeat(3, 1fr)', sm: 'repeat(6, 1fr)' }
                : { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
              gap: 1.5,
            }}
          >
            {SYMBOLS.map((symbol, i) => {
              const matches = roll ? roll.filter((face) => face === i).length : 0;
              const shown = phase === 'result' && roll !== null;
              const won = shown && matches > 0;
              const lost = shown && matches === 0;
              let verdict = 'Open';
              if (won) {
                verdict =
                  mode === 'chips' ? `Pays ${matches}` : matches > 1 ? `Safe ×${matches}` : 'Safe';
              }
              if (lost) verdict = mode === 'chips' ? 'Lose 1' : 'Out';

              return (
                <Box
                  key={symbol.id}
                  component="button"
                  type="button"
                  onClick={() => setSignIndex(i)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.25,
                    p: 1.75,
                    cursor: 'pointer',
                    font: 'inherit',
                    color: 'inherit',
                    textAlign: 'center',
                    border: '2px solid',
                    borderColor: won ? colors.darkPink : 'divider',
                    borderRadius: `${RADIUS}px`,
                    bgcolor: won ? colors.lightPink : 'background.paper',
                    opacity: lost ? 0.5 : 1,
                    transition: 'border-color 0.2s ease, transform 0.2s ease',
                    '&:hover': { transform: 'translateY(-2px)', borderColor: colors.gold },
                  }}
                >
                  <Box
                    component="span"
                    sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, lineHeight: 1 }}
                  >
                    {symbol.glyph}
                  </Box>
                  <Typography variant="h5" component="span" sx={{ mt: 0.75 }}>
                    {symbol.name}
                  </Typography>
                  <Box
                    component="span"
                    sx={{
                      mt: 1,
                      px: 1.25,
                      py: 0.5,
                      borderRadius: 999,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      bgcolor: won ? colors.darkPink : 'rgba(44,53,57,0.08)',
                      color: won ? '#FFFFFF' : 'text.secondary',
                    }}
                  >
                    {verdict}
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75 }}>
                    {tally[i]} {tally[i] === 1 ? 'hit' : 'hits'}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {twistsOn && twist && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                border: `2px dashed ${colors.gold}`,
                borderRadius: `${RADIUS}px`,
                bgcolor: 'rgba(212,175,55,0.08)',
              }}
            >
              <Typography variant="overline" color="text.secondary">
                Twist for this round
              </Typography>
              <Typography variant="h5" sx={{ mt: 0.25, mb: 0.5 }}>
                {twist.name}
              </Typography>
              <Typography variant="body1">{twist.text}</Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 0.5 }}>
            Rolls
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            Every roll this game, in order.
          </Typography>
          {history.length === 0 ? (
            <Typography variant="body2" color="text.disabled">
              No rolls yet.
            </Typography>
          ) : (
            <Box ref={ledgerRef} sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
              {history.map((entry, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: '0 0 auto',
                    minWidth: 62,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: `${RADIUS}px`,
                    px: 1,
                    py: 0.75,
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    R{index + 1}
                  </Typography>
                  <Box sx={{ fontSize: '1.25rem', lineHeight: 1.3 }}>
                    {entry.map((face) => SYMBOLS[face].glyph).join('')}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Divider sx={{ my: { xs: 5, md: 7 } }} />

        <Box sx={{ maxWidth: 760 }}>
          <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
            Setup
          </Typography>
          <Box component="ol" sx={{ pl: 2.5, m: 0, mb: 3 }}>
            <li>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Tape a sign at six spots: the four corners, the front, and the back. Click a
                symbol above for a printable sign.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Open this page on the projector and hit Full screen.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Call for bets. Everyone walks to a symbol. No moving once the shake starts.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Shake as long as you want, hit stop, then read the three dice. Symbols that came
                up win, the rest lose.
              </Typography>
            </li>
          </Box>
          <Typography variant="body1" sx={{ mb: 3 }}>
            One shake settles every spot at once, so group size does not slow the game down.
          </Typography>

          <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
            Scoring
          </Typography>
          <Typography variant="h6" component="h3" sx={{ mb: 0.5 }}>
            Knockout
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            If your symbol does not come up, you are out. Whoever is left picks again each round
            and can stay or move. Forty players takes four or five rounds, about ten minutes.
          </Typography>
          <Typography variant="h6" component="h3" sx={{ mb: 0.5 }}>
            Chips
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Everyone starts with five chips and bets one a round. A win pays one chip per matching
            die: one die pays one, two dice pay two, three dice pay three. A loss costs the chip.
            Play ten rounds and count. Out of chips, out of the game.
          </Typography>

          <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
            Odds
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Three dice, six symbols. Any one symbol comes up 42% of the time, so a knockout round
            cuts a bit more than half the room: 40, 17, 7, 3, 1.
          </Typography>
          <TableContainer sx={{ mb: 2, maxWidth: 480 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Your symbol shows on</TableCell>
                  <TableCell>Pays</TableCell>
                  <TableCell align="right">Chance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>No dice</TableCell>
                  <TableCell>Lose 1</TableCell>
                  <TableCell align="right">57.9%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>One die</TableCell>
                  <TableCell>1 chip</TableCell>
                  <TableCell align="right">34.7%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Two dice</TableCell>
                  <TableCell>2 chips</TableCell>
                  <TableCell align="right">6.9%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Three dice</TableCell>
                  <TableCell>3 chips</TableCell>
                  <TableCell align="right">0.5%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
            Twists
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Turn on Twists and one is drawn each round. Read it out before bets.
          </Typography>
          <Box component="dl" sx={{ m: 0, mb: 3 }}>
            {TWISTS.map((item) => (
              <Box key={item.name} sx={{ mb: 1.25 }}>
                <Typography component="dt" variant="h6">
                  {item.name}
                </Typography>
                <Typography component="dd" variant="body1" sx={{ m: 0 }}>
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>

          <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
            Other names
          </Typography>
          <Typography variant="body1">
            Bầu cua cá cọp in Vietnam, klah klouk in Cambodia, nam tao pu pla in Thailand, hoo hey
            how in Malaysia and Singapore. Same six symbols, same three dice. Some sets use a deer
            instead of the tiger.
          </Typography>
        </Box>
      </Container>

      <Dialog
        open={signIndex !== null}
        onClose={() => setSignIndex(null)}
        maxWidth="sm"
        fullWidth
        aria-labelledby="station-sign-title"
      >
        {signIndex !== null && (
          <Box
            className="station-sign"
            sx={{
              background: `linear-gradient(180deg, ${board.face} 0%, ${board.deep} 100%)`,
              color: board.cream,
              textAlign: 'center',
              px: 3,
              py: 5,
              WebkitPrintColorAdjust: 'exact',
              printColorAdjust: 'exact',
            }}
          >
            <Box sx={{ fontSize: { xs: '5rem', md: '8rem' }, lineHeight: 1 }}>
              {SYMBOLS[signIndex].glyph}
            </Box>
            <Typography
              id="station-sign-title"
              variant="h1"
              sx={{ color: board.cream, fontSize: { xs: '2.8rem', md: '4rem' }, mt: 1 }}
            >
              {SYMBOLS[signIndex].name}
            </Typography>
            <Box
              sx={{ width: 72, height: 4, bgcolor: colors.pink, borderRadius: 2, mx: 'auto', mt: 2 }}
            />
            <Stack
              className="no-print"
              direction="row"
              spacing={1.5}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<PrintIcon />}
                onClick={() => window.print()}
                sx={{ fontWeight: 700 }}
              >
                Print sign
              </Button>
              <Button
                variant="outlined"
                onClick={() => setSignIndex(null)}
                sx={{ color: board.cream, borderColor: 'rgba(247,240,230,0.4)' }}
              >
                Close
              </Button>
            </Stack>
          </Box>
        )}
      </Dialog>

      <Footer />
    </Box>
  );
};

export default Game;
