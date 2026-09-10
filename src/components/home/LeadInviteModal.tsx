import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

const LEAD_APPLICATION_FORM_URL = 'https://forms.gle/2vkFbNL3s8DxbCvi9';

type LeadInviteModalProps = {
  open: boolean;
  onClose: () => void;
};

const LeadInviteModal = ({ open, onClose }: LeadInviteModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Lead with SASC · Fall 2026</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Recruiting for Internal, External, Ops, and PR. Branch details are on the Lead page.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Applications are reviewed on a rolling basis, so apply as soon as possible for priority. Fall 2026
          applications are due Friday, Sept. 25 @ 11:59 p.m.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ flexWrap: 'wrap', gap: 1.5, justifyContent: 'flex-end', px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Not Now
        </Button>
        <Button
          component="a"
          href="/lead"
          variant="outlined"
          color="primary"
          onClick={onClose}
        >
          See the branches
        </Button>
        <Button
          component="a"
          href={LEAD_APPLICATION_FORM_URL}
          target="_blank"
          rel="noopener"
          variant="contained"
          color="primary"
          onClick={onClose}
        >
          Apply now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeadInviteModal;
