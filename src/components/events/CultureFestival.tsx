import { Box, Button, CardMedia, Stack, Typography, MobileStepper, IconButton } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';
import EventCard from './EventCard';

const images = [
    {
        url: '/culture-festival.jpg',
        label: 'SEA Culture Festival Performance',
    },
    {
        url: '/culture-festival-2.jpg',
        label: 'Traditional Dance Performance',
    },
    {
        url: '/culture-festival-3.jpg',
        label: 'Cultural Exhibition',
    },
];

const CultureFestival = () => {
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <EventCard
            borderColor="divider"
            media={
                <>
                        <CardMedia
                            component="img"
                            image={images[activeStep].url}
                            alt={images[activeStep].label}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                        }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                bgcolor: 'rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            <MobileStepper
                                steps={maxSteps}
                                position="static"
                                activeStep={activeStep}
                                sx={{ 
                                    bgcolor: 'transparent',
                                    '& .MuiMobileStepper-dot': {
                                        bgcolor: 'rgba(255, 255, 255, 0.5)',
                                    },
                                    '& .MuiMobileStepper-dotActive': {
                                        bgcolor: 'white',
                                    },
                                }}
                                nextButton={
                                    <IconButton
                                        size="small"
                                        onClick={handleNext}
                                        disabled={activeStep === maxSteps - 1}
                                        aria-label="Next photo"
                                        sx={{ color: 'white' }}
                                    >
                                        <KeyboardArrowRight />
                                    </IconButton>
                                }
                                backButton={
                                    <IconButton
                                        size="small"
                                        onClick={handleBack}
                                        disabled={activeStep === 0}
                                        aria-label="Previous photo"
                                        sx={{ color: 'white' }}
                                    >
                                        <KeyboardArrowLeft />
                                    </IconButton>
                                }
                            />
                        </Box>
                </>
            }
        >
                            <Typography variant="h5" component="h2" sx={{ mb: 0.5 }}>
                                SEA Culture Festival
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                April 5, 2024 • Time TBD
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                SEACF is our annual culture festival at the Campanile Esplanade, with dance, exhibitions, and workshops from
                Southeast Asian organizations across campus.
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                Stop by for a performance or spend the afternoon exploring the full program.
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Location: Campanile Esplanade
                            </Typography>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={1}
                            justifyContent="flex-start"
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=SEA+Culture+Festival&dates=20240405T170000Z/20240405T230000Z&details=Join+us+for+a+celebration+of+Southeast+Asian+cultures!&location=Campanile+Esplanade,+Berkeley,+CA"
                                target="_blank"
                                size="small"
                                startIcon={<CalendarMonthIcon />}
                            >
                                Add to Calendar
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                href="https://bit.ly/culturefestperform"
                                target="_blank"
                                size="small"
                            >
                                Sign Up to Perform
                            </Button>
                        </Stack>
        </EventCard>
    );
};

export default CultureFestival; 