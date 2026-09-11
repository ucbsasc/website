import { Box, Container, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { colors, RADIUS } from '../theme/colors';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  image: string;
  /** CSS background-position for the image, e.g. 'center 25%' to keep faces in frame */
  imagePosition?: string;
  children?: ReactNode;
  compact?: boolean;
};

const PageHeader = ({
  title,
  subtitle,
  image,
  imagePosition = 'center',
  children,
  compact = false,
}: PageHeaderProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        color: 'white',
        py: compact ? { xs: 7, md: 9 } : { xs: 8, md: 11 },
        mb: { xs: 5, md: 7 },
        overflow: 'hidden',
        borderBottom: `4px solid ${colors.pink}`,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: imagePosition,
          filter: 'saturate(0.9) contrast(1.05)',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(115deg, rgba(20,18,16,0.88) 0%, rgba(30,43,54,0.72) 55%, rgba(0,50,98,0.45) 100%)`,
          zIndex: 1,
        },
      }}
    >
      <Container sx={{ position: 'relative', zIndex: 2 }}>
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
            bgcolor: 'rgba(0,0,0,0.25)',
          }}
        >
          SASC · Berkeley
        </Typography>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            color: 'white',
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            mb: subtitle || children ? 1.75 : 0,
            fontSize: { xs: '2.6rem', md: compact ? '3.1rem' : '3.6rem' },
            maxWidth: 720,
            letterSpacing: '-0.03em',
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.88)',
              maxWidth: 560,
              lineHeight: 1.65,
              fontSize: { xs: '1.05rem', md: '1.125rem' },
            }}
          >
            {subtitle}
          </Typography>
        )}
        {children && <Box sx={{ mt: 3 }}>{children}</Box>}
      </Container>
    </Box>
  );
};

export default PageHeader;
