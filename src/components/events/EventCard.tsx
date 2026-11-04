import { Card, CardContent, CardMedia, Grid, Box, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';
import { colors } from '../../theme/colors';
import { LabelTape, MaskingTape } from '../brand';

interface EventCardImage {
  src: string;
  alt: string;
  component?: React.ElementType;
  sx?: SxProps<Theme>;
}

interface EventCardProps {
  statusLabel?: string;
  /** Label tape color for the status strip */
  statusTape?: 'black' | 'pink' | 'cream';
  /** @deprecated status labels are label tape now; use statusTape */
  statusBgColor?: string;
  /** @deprecated status labels are label tape now; use statusTape */
  statusColor?: string;
  borderColor?: string;
  minMediaHeight?: number;
  maxMediaHeight?: number;
  image?: EventCardImage;
  media?: ReactNode;
  mediaContainerSx?: SxProps<Theme>;
  children: ReactNode;
  cardSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

/**
 * Upcoming-event card: square paper with an ink outline and a hard shadow.
 * Flyers stay in full color here; the duotone is for photos only.
 */
const EventCard = ({
  statusLabel,
  statusTape = 'pink',
  borderColor = colors.ink,
  minMediaHeight = 300,
  maxMediaHeight = 360,
  image,
  media,
  mediaContainerSx,
  children,
  cardSx,
  contentSx,
}: EventCardProps) => {
  return (
    <Card
      sx={{
        mb: { xs: 5, md: 6 },
        position: 'relative',
        borderColor,
        borderWidth: 2,
        boxShadow: `5px 5px 0 ${colors.ink}`,
        overflow: 'visible',
        ...cardSx,
      }}
    >
      <MaskingTape corner="tl" />
      {statusLabel && (
        <LabelTape
          color={statusTape}
          tilt={2}
          sx={{ position: 'absolute', top: { xs: -12, md: -14 }, right: { xs: 12, md: 20 }, zIndex: 4 }}
        >
          {statusLabel}
        </LabelTape>
      )}

      <Grid container alignItems="stretch">
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              minHeight: minMediaHeight,
              maxHeight: maxMediaHeight,
              overflow: 'hidden',
              lineHeight: 0,
              bgcolor: colors.black,
              borderBottom: { xs: `2px solid ${colors.ink}`, md: 'none' },
              borderRight: { md: `2px solid ${colors.ink}` },
              ...mediaContainerSx,
            }}
          >
            {media ??
              (image && (
                <CardMedia
                  component={image.component ?? 'img'}
                  image={image.src}
                  alt={image.alt}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    ...image.sx,
                  }}
                />
              ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <CardContent sx={{ height: '100%', p: { xs: 2.5, md: 3.5 }, ...contentSx }}>{children}</CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EventCard;
