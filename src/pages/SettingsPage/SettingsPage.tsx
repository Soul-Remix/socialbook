import { Container, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import AccountDeleteBtn from '../../components/AccountDeleteBtn/AccountDeleteBtn';
import AccountSettingsForm from '../../components/AccountSettingsForm/AccountSettingsForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import PasswordChangeForm from '../../components/PasswordChangeForm/PasswordChangeForm';
import ProfileSettingsForm from '../../components/ProfileSettingsForm/ProfileSettingsForm';
import SettingsFormSkeleton from '../../components/Skeletons/SettingsFormSkeleton/SettingsFormSkeleton';

import { useTrackedStore } from '../../store/store';
import fetchUser from '../../utils/fetchUser';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const SettingsPage = () => {
  const [value, setValue] = useState(0);
  const state = useTrackedStore();
  const id = state.user.id;
  const history = useHistory();

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const { data, isLoading, isError, error } = useQuery(`user${id}`, () =>
    fetchUser(state.token, id, state.logOut, history)
  );

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Profile" />
          <Tab label="Account" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {data && <ProfileSettingsForm profile={data.extendedProfile} />}
        {isLoading && <SettingsFormSkeleton />}
        {isError && <ErrorMessage message={error} />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {data && (
          <>
            <AccountSettingsForm user={data} />
            <PasswordChangeForm />
            <AccountDeleteBtn />
          </>
        )}
      </TabPanel>
    </Container>
  );
};

export default SettingsPage;
