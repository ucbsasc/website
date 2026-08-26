import { Modal, Box, Typography, Button, styled } from '@mui/material';

const MAILING_LIST_FORM_URL = 'https://forms.gle/7AVw8QoKPEZz11Bu8';

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1)
  }
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  maxWidth: 500,
  width: '90%',
  maxHeight: '90vh',
  overflow: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    width: '95%',
    '& .MuiTypography-h4': {
      fontSize: '1.5rem'
    }
  }
}));

interface MailingListModalProps {
  open: boolean;
  onClose: () => void;
}

const MailingListModal = ({ open, onClose }: MailingListModalProps) => {
  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContent>
        <Typography variant="h4" gutterBottom>
          Join SASC
        </Typography>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Sign up for our mailing list to stay in the loop on events, GMs, and announcements.
          </Typography>
          <Button
            variant="contained"
            size="large"
            href={MAILING_LIST_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mt: 2 }}
          >
            Subscribe to Mailing List
          </Button>
        </Box>
      </ModalContent>
    </StyledModal>
  );
};

export default MailingListModal;
