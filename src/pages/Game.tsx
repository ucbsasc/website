import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  Typography,
} from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import StopIcon from '@mui/icons-material/Stop';
import PrintIcon from '@mui/icons-material/Print';
import Footer from '../components/Footer';
import DiceScene from '../components/game/DiceScene';
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

type Phase = 'bets' | 'shaking' | 'result';

const DICE_SOUND_FILES = [
  '/sounds/dice-roll-1.mp3',
  '/sounds/dice-roll-2.mp3',
  '/sounds/dice-roll-3.mp3',
];

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

  const [phase, setPhase] = useState<Phase>('bets');
  const [roll, setRoll] = useState<number[] | null>(null);
  const [rollTarget, setRollTarget] = useState<number[] | null>(null);
  const [spinToken, setSpinToken] = useState(0);
  const [history, setHistory] = useState<number[][]>([]);
  const [signIndex, setSignIndex] = useState<number | null>(null);
  const [isFull, setIsFull] = useState(false);
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const ledgerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const diceSounds = useRef<HTMLAudioElement[]>([]);
  const rollTargetRef = useRef<number[] | null>(null);

  useEffect(() => {
    diceSounds.current = DICE_SOUND_FILES.map((src) => new Audio(src));
  }, []);

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

  const shake = useCallback(() => {
    if (phase === 'shaking') return;
    setRoll(null);
    setRollTarget(null);
    rollTargetRef.current = null;
    setPhase('shaking');
  }, [phase]);

  const stopShake = useCallback(() => {
    if (phase !== 'shaking' || rollTargetRef.current) return;

    const result = [rollDie(), rollDie(), rollDie()];
    rollTargetRef.current = result;
    setRollTarget(result);
    setSpinToken((t) => t + 1);

    const sounds = diceSounds.current;
    if (sounds.length > 0) {
      const sound = sounds[Math.floor(Math.random() * sounds.length)];
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  }, [phase]);

  const handleSettled = useCallback(() => {
    const result = rollTargetRef.current;
    if (!result) return;
    setRoll(result);
    setPhase('result');
    setHistory((prev) => [...prev, result]);
  }, []);

  const nextRound = useCallback(() => {
    // rollTarget is left as-is: the bowl lowers back over the same resting dice, so there's
    // nothing to pop until the next `shake()` actually starts a new roll.
    setPhase('bets');
    setRoll(null);
  }, []);

  const newGame = useCallback(() => {
    setPhase('bets');
    setRoll(null);
    setHistory([]);
  }, []);

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
  const symbolGlyphs = useMemo(() => SYMBOLS.map((s) => s.glyph), []);

  let kicker = 'Bowl down';
  let call = 'Place your bets.';
  if (phase === 'shaking') {
    kicker = 'Shaking';
    call = 'Stop when the bets are in.';
  } else if (phase === 'result' && roll) {
    kicker = `${winners.length} of 6 spots survive`;
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
          <Box
            sx={{
              background: `linear-gradient(180deg, ${board.face} 0%, ${board.deep} 100%)`,
              border: `3px solid ${colors.gold}`,
              borderRadius: `${RADIUS}px`,
              boxShadow: 'inset 0 0 0 5px rgba(247,240,230,0.1)',
              px: { xs: 2, md: 3 },
              py: { xs: 2, md: 2.5 },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                height: isFull ? { xs: 380, md: 480 } : { xs: 320, md: 380 },
                borderRadius: `${RADIUS}px`,
                overflow: 'hidden',
              }}
            >
              <DiceScene
                glyphs={symbolGlyphs}
                phase={phase}
                spinToken={spinToken}
                rollTarget={rollTarget}
                onSettled={handleSettled}
                reduceMotion={reduceMotion}
              />
            </Box>

            <Box sx={{ textAlign: 'center', mb: 1, mt: 1, minHeight: 44 }}>
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
                  fontSize: isFull ? { xs: '1.5rem', md: '2rem' } : { xs: '1.15rem', md: '1.4rem' },
                  mt: 0.25,
                }}
              >
                {call}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.25} justifyContent="center" flexWrap="wrap" useFlexGap>
              <Button
                variant="contained"
                color="primary"
                startIcon={phase === 'shaking' ? <StopIcon /> : <CasinoIcon />}
                onClick={advance}
                sx={{ fontWeight: 700 }}
              >
                {phase === 'result' ? 'Next round' : phase === 'shaking' ? 'Stop' : 'Shake'}
              </Button>
              <Button
                variant="outlined"
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
              if (won) verdict = matches > 1 ? `Safe ×${matches}` : 'Safe';
              if (lost) verdict = 'Out';

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
                Open this page on the projector and press F for full screen.
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
          <Typography variant="body1" sx={{ mb: 3 }}>
            If your symbol does not come up, you are out. Whoever is left picks again each round
            and can stay or move. Forty players takes four or five rounds, about ten minutes.
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
                  <TableCell>Result</TableCell>
                  <TableCell align="right">Chance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>No dice</TableCell>
                  <TableCell>Out</TableCell>
                  <TableCell align="right">57.9%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>One die</TableCell>
                  <TableCell>Safe</TableCell>
                  <TableCell align="right">34.7%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Two dice</TableCell>
                  <TableCell>Safe ×2</TableCell>
                  <TableCell align="right">6.9%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Three dice</TableCell>
                  <TableCell>Safe ×3</TableCell>
                  <TableCell align="right">0.5%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
            Twists
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Draw one at random each round — slips of paper in a hat works fine — and read it out
            before bets.
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
