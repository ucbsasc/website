import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import { Edit, Delete, Email } from '@mui/icons-material';
import { getMembers, updateMember, deleteMember, Member } from '../firebase/members';
import Footer from '../components/Footer';
import { usePageTitle } from '../hooks/usePageTitle';

const MemberManagement: React.FC = () => {
  usePageTitle('Member Management');
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Member>>({});

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const membersData = await getMembers();
      setMembers(membersData);
    } catch (err) {
      setError('Failed to load members');
      console.error('Error loading members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setEditFormData({
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      phone: member.phone,
      year: member.year,
      major: member.major,
      interests: member.interests,
      isActive: member.isActive,
      notes: member.notes
    });
    setEditDialogOpen(true);
  };

  const handleUpdateMember = async () => {
    if (!selectedMember?.id) return;

    try {
      await updateMember(selectedMember.id, editFormData);
      await loadMembers();
      setEditDialogOpen(false);
      setSelectedMember(null);
    } catch (err) {
      setError('Failed to update member');
      console.error('Error updating member:', err);
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await deleteMember(memberId);
        await loadMembers();
      } catch (err) {
        setError('Failed to delete member');
        console.error('Error deleting member:', err);
      }
    }
  };

  const formatDate = (timestamp?: Member['joinDate']) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading members...
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Container sx={{ py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Member Management
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h4" color="primary">
                    {members.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Members
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h4" color="success.main">
                    {members.filter(m => m.isActive).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Members
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h4" color="info.main">
                    {members.filter(m => m.year === 'Freshman').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Freshmen
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h4" color="warning.main">
                    {members.filter(m => m.year === 'Graduate').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Graduate Students
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Major</TableCell>
                <TableCell>Interests</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {member.firstName} {member.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Email fontSize="small" />
                      {member.email}
                    </Box>
                  </TableCell>
                  <TableCell>{member.year}</TableCell>
                  <TableCell>{member.major || 'N/A'}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {member.interests.slice(0, 2).map((interest) => (
                        <Chip key={interest} label={interest} size="small" />
                      ))}
                      {member.interests.length > 2 && (
                        <Chip label={`+${member.interests.length - 2}`} size="small" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>{formatDate(member.joinDate)}</TableCell>
                  <TableCell>
                    <Chip
                      label={member.isActive ? 'Active' : 'Inactive'}
                      color={member.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit Member">
                      <IconButton
                        size="small"
                        onClick={() => handleEditMember(member)}
                        aria-label="Edit member"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Member">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteMember(member.id!)}
                        color="error"
                        aria-label="Delete member"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Edit Member Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Member</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={editFormData.firstName || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, firstName: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={editFormData.lastName || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={editFormData.email || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={editFormData.phone || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Academic Year</InputLabel>
                <Select
                  value={editFormData.year || ''}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, year: e.target.value }))}
                  label="Academic Year"
                >
                  <MenuItem value="Freshman">Freshman</MenuItem>
                  <MenuItem value="Sophomore">Sophomore</MenuItem>
                  <MenuItem value="Junior">Junior</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                  <MenuItem value="Graduate">Graduate</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Major"
                value={editFormData.major || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, major: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={editFormData.isActive ? 'Active' : 'Inactive'}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, isActive: e.target.value === 'Active' }))}
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                value={editFormData.notes || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, notes: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateMember} variant="contained">
            Update Member
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
};

export default MemberManagement;
