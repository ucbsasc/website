import { useMemo, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    FormLabel,
    Slider,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useTheme,
} from '@mui/material';
import Footer from '../components/Footer';
import { usePageTitle } from '../hooks/usePageTitle';

const DEFAULT_TEXT = 'https://ucbsasc.org';

const hexToRgbParam = (hex: string) => {
    const normalized = hex.replace('#', '');
    const bigint = parseInt(normalized, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}-${g}-${b}`;
};

const HEX_PATTERN = /^#[0-9a-f]{6}$/i;

// Relative luminance, used to warn when a color is too light to scan reliably
const luminance = (hex: string) => {
    const channels = [1, 3, 5].map((i) => {
        const c = parseInt(hex.slice(i, i + 2), 16) / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const QRGenerator = () => {
    usePageTitle('QR Code Generator');
    const theme = useTheme();
    const [input, setInput] = useState('');
    const [size, setSize] = useState(240);
    const [color, setColor] = useState(theme.palette.primary.main);
    const [hexDraft, setHexDraft] = useState(theme.palette.primary.main);

    const applyColor = (value: string) => {
        setColor(value);
        setHexDraft(value);
    };

    const handleHexChange = (value: string) => {
        const next = value.startsWith('#') ? value : `#${value}`;
        setHexDraft(next);
        if (HEX_PATTERN.test(next)) {
            setColor(next);
        }
    };

    const tooLight = luminance(color) > 0.5;

    const qrValue = input.trim() || DEFAULT_TEXT;

    const qrUrl = useMemo(
        () =>
            `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                qrValue,
            )}&size=${size}x${size}&margin=10&color=${hexToRgbParam(color)}`,
        [qrValue, size, color],
    );

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = qrUrl;
        link.download = 'sasc-qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const colorOptions = [
        {
            label: 'Primary Pink',
            value: theme.palette.primary.main,
        },
        {
            label: 'Secondary Gold',
            value: theme.palette.secondary.main,
        },
        {
            label: 'Charcoal',
            value: '#2C3539',
        },
    ];

    return (
        <Box>
            <Box
                sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    py: 10,
                    mb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                        Create a QR Code
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Need a quick QR code for tabling, presentations, or events? Drop a link, phrase, or email below and download it instantly.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{ pb: 10 }}>
                <Card sx={{ boxShadow: 6 }}>
                    <CardContent>
                        <Stack spacing={4}>
                            <Stack spacing={2}>
                                <Typography variant="h5">QR Content</Typography>
                                <TextField
                                    label="Text, URL, email, or anything you need"
                                    value={input}
                                    onChange={(event) => setInput(event.target.value)}
                                    placeholder={DEFAULT_TEXT}
                                    fullWidth
                                    helperText="Leave blank to generate a code for the SASC website."
                                />
                            </Stack>

                            <Stack spacing={2}>
                                <Typography variant="h6">Size: {size}px</Typography>
                                <Slider
                                    min={120}
                                    max={400}
                                    step={20}
                                    value={size}
                                    onChange={(_, newValue) => setSize(newValue as number)}
                                    valueLabelDisplay="auto"
                                />
                            </Stack>

                            <FormControl component="fieldset" sx={{ gap: 1 }}>
                                <FormLabel component="legend">Primary color</FormLabel>
                                <ToggleButtonGroup
                                    value={color}
                                    exclusive
                                    onChange={(_, value) => {
                                        if (value) {
                                            applyColor(value);
                                        }
                                    }}
                                    size="small"
                                    sx={{ flexWrap: 'wrap', gap: 1 }}
                                >
                                    {colorOptions.map((option) => (
                                        <ToggleButton
                                            key={option.value}
                                            value={option.value}
                                            sx={{
                                                borderRadius: 2,
                                                px: 2,
                                                '&.Mui-selected': {
                                                    bgcolor: option.value,
                                                    color: '#fff',
                                                    '&:hover': { bgcolor: option.value },
                                                },
                                                '&:hover': {
                                                    bgcolor: `${option.value}20`,
                                                },
                                            }}
                                        >
                                            {option.label}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                                <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mt: 1 }}>
                                    <Box
                                        component="label"
                                        title="Pick any color"
                                        sx={{
                                            position: 'relative',
                                            flexShrink: 0,
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            bgcolor: color,
                                            cursor: 'pointer',
                                            boxShadow: '0 0 0 3px #fff, 0 0 0 4px rgba(0,0,0,0.2)',
                                            transition: 'transform 0.15s',
                                            '&:hover': { transform: 'scale(1.08)' },
                                            '&:focus-within': {
                                                boxShadow: `0 0 0 3px #fff, 0 0 0 5px ${theme.palette.primary.main}`,
                                            },
                                        }}
                                    >
                                        <Box
                                            component="input"
                                            type="color"
                                            value={color}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                applyColor(event.target.value)
                                            }
                                            aria-label="Custom QR color"
                                            sx={{
                                                position: 'absolute',
                                                inset: 0,
                                                opacity: 0,
                                                width: '100%',
                                                height: '100%',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </Box>
                                    <TextField
                                        label="Hex"
                                        size="small"
                                        value={hexDraft}
                                        onChange={(event) => handleHexChange(event.target.value.trim())}
                                        onBlur={() => setHexDraft(color)}
                                        error={!HEX_PATTERN.test(hexDraft)}
                                        helperText={
                                            tooLight
                                                ? 'Light colors can be hard for phones to scan.'
                                                : 'Click the circle to pick any color.'
                                        }
                                        inputProps={{ maxLength: 7, spellCheck: false }}
                                        sx={{ maxWidth: 220 }}
                                    />
                                </Stack>
                            </FormControl>

                            <Stack
                                spacing={2}
                                alignItems="center"
                                sx={{
                                    bgcolor: 'grey.100',
                                    borderRadius: 2,
                                    p: 3,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={qrUrl}
                                    alt="Generated QR code"
                                    sx={{
                                        width: size,
                                        height: size,
                                        bgcolor: 'white',
                                        borderRadius: 2,
                                        boxShadow: 3,
                                    }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    Preview updates automatically as you type.
                                </Typography>
                            </Stack>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end">
                                <Button variant="outlined" color="inherit" onClick={() => setInput('')}>
                                    Reset
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleDownload}>
                                    Download PNG
                                </Button>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>

            <Footer />
        </Box>
    );
};

export default QRGenerator;
