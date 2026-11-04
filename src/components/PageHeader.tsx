import { Box, Container, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { colors } from '../theme/colors';
import { TintedPhoto } from './brand';
import { graffitiSx } from '../theme/textures';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  image: string;
  /** CSS object-position for the image, e.g. 'center 25%' to keep faces in frame */
  imagePosition?: string;
  /** Darken the duotone less, for photos that are already dark */
  lightOverlay?: boolean;
  /** Set the title in plain bold Helvetica instead of the graffiti accent */
  plainTitle?: boolean;
  children?: ReactNode;
  compact?: boolean;
};

const PageHeader = ({
  title,
  subtitle,
  image,
  imagePosition = 'center',
  lightOverlay = false,
  plainTitle = false,
  children,
  compact = false,
}: PageHeaderProps) => {
  // Sedgwick's lowercase l reads as a bar, so titles with an l go in caps.
  const graffitiCase = /l/.test(title) ? 'uppercase' : 'none';

  return (
    <Box
      sx={{
        position: 'relative',
        color: colors.textOnBlack,
        py: compact ? { xs: 7, md: 9 } : { xs: 8, md: 11 },
        mb: { xs: 5, md: 7 },
        overflow: 'hidden',
        bgcolor: colors.black,
        borderBottom: `2px solid ${colors.ink}`,
      }}
    >
      <TintedPhoto
        src={image}
        position={imagePosition}
        darken={lightOverlay ? 0.38 : 0.45}
        loading="eager"
        sx={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            mb: subtitle || children ? { xs: 2, md: 2.5 } : 0,
            maxWidth: 820,
            ...(plainTitle
              ? {
                  color: colors.textOnBlack,
                  fontWeight: 700,
                  fontSize: { xs: '2.6rem', md: compact ? '3.1rem' : '3.6rem' },
                  letterSpacing: '-0.025em',
                }
              : {
                  ...graffitiSx,
                  textTransform: graffitiCase,
                  fontSize: { xs: '3.4rem', sm: '4.4rem', md: compact ? '5.2rem' : '5.8rem' },
                }),
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body1"
            sx={{
              color: colors.textOnBlack,
              maxWidth: 560,
              lineHeight: 1.55,
              fontSize: { xs: '1.05rem', md: '1.125rem' },
              fontWeight: 500,
              textShadow: '0 1px 2px rgba(20,16,18,0.6)',
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
