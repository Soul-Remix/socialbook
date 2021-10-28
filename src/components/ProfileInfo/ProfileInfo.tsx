import { Cake, LocationCity, PermIdentity, Room } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';

interface Props {
  profile: {
    country: String | null;
    city: String | null;
    birthDate: String | null;
    livesIn: String | null;
    gender: String | null;
  };
}

const ProfileInfo = (props: Props) => {
  const { country, city, birthDate, livesIn, gender } = props.profile;
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: { sm: '1fr 1fr' },
        }}
      >
        <Box>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              mb: 1.5,
            }}
          >
            <LocationCity sx={{ mr: 0.7 }} />
            Lives In:
            <Typography
              sx={{ fontWeight: 'bold', color: 'text.primary', ml: 0.7 }}
              component="span"
            >
              {livesIn ? livesIn : 'Private'}
            </Typography>
          </Typography>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              mb: 1.5,
            }}
          >
            <Room sx={{ mr: 0.7 }} />
            From{' '}
            <Typography
              sx={{ fontWeight: 'bold', color: 'text.primary', ml: 0.7 }}
              component="span"
            >
              {country ? country : 'Private'}
            </Typography>
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              mb: 1.5,
            }}
          >
            <Cake sx={{ mr: 0.7 }} />
            Birth Date:
            <Typography
              sx={{ fontWeight: 'bold', color: 'text.primary', ml: 0.7 }}
              component="span"
            >
              {birthDate ? birthDate : 'Private'}
            </Typography>
          </Typography>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              mb: 1.5,
            }}
          >
            <PermIdentity sx={{ mr: 0.7 }} />
            Gender:
            <Typography
              sx={{ fontWeight: 'bold', color: 'text.primary', ml: 0.7 }}
              component="span"
            >
              {gender ? gender : 'Private'}
            </Typography>
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ width: '100%', mt: 2, mb: 3 }} />
    </>
  );
};

export default ProfileInfo;
