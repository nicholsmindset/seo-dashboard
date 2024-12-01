import React from 'react';
import { Chip } from '@mui/material';

const statusColors = {
  'Draft': '#FFA726',
  'In Progress': '#29B6F6',
  'In Review': '#AB47BC',
  'Published': '#66BB6A',
  'Needs Update': '#EF5350'
};

const ContentStatusChip = ({ status }) => {
  return (
    <Chip
      label={status}
      sx={{
        backgroundColor: statusColors[status] || '#757575',
        color: '#fff',
        fontWeight: 500,
        '&:hover': {
          backgroundColor: statusColors[status] || '#757575',
          opacity: 0.9
        }
      }}
    />
  );
};

export default ContentStatusChip;
