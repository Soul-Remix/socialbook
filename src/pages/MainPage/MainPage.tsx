import { Add } from '@mui/icons-material';
import { Container, Fab } from '@mui/material';
import { useState } from 'react';
import Feed from '../../components/Feed/Feed';
import PostCreateDialog from '../../components/PostCreateDialog/PostCreateDialog';

const MainPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <Container
      sx={{
        padding: { xs: 0, sm: 4 },
        mr: { sm: 6, md: 8 },
        ml: { sm: 6, md: 8 },
        mt: 2,
        position: 'relative',
      }}
    >
      <PostCreateDialog open={open} setOpen={setOpen} />
      <Feed />
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: { xs: '80px', md: '25px' },
          right: { xs: '20px', lg: '300px' },
        }}
        onClick={() => setOpen(true)}
      >
        <Add />
      </Fab>
    </Container>
  );
};

export default MainPage;
