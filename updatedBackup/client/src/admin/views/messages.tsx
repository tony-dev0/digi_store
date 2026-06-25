import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import NotifyClient from "./subviews/NotifyClient";
import EmailClient from "./subviews/EmailClient";
import RecievedMessages from "./subviews/RecievedMessages";
import SentMessages from "./subviews/SentMessages";
import axios from "axios";
import {
  storeRecievedNotification,
  storeSentNotification,
} from "../../redux/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Messages() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/notifications/in")
      .then((res) => {
        dispatch(storeRecievedNotification(res.data));
      })
      .catch(() => toast.error("an error occurred"));

    axios
      .get("/api/notifications/out")
      .then((res) => {
        dispatch(storeSentNotification(res.data));
      })
      .catch(() => toast.error("an error occurred"));
  }, []);

  const { recieved_notifications } = useSelector((state: any) => state.admin);
  const label3 =
    !recieved_notifications || recieved_notifications.length == 0
      ? "Recieved Messages(0)"
      : `Recieved Messages(${recieved_notifications.length})`;

  const { sent_notifications } = useSelector((state: any) => state.admin);
  const label4 =
    !sent_notifications || sent_notifications.length == 0
      ? "Sent Messages(0)"
      : `Sent Messages(${sent_notifications.length})`;

  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };
  return (
    <div>
      <div className="cover">
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="message tabs"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab label="Notify Client" {...a11yProps(0)} />
            <Tab label="Email Client" {...a11yProps(1)} />
            <Tab label={label3} {...a11yProps(2)} />
            <Tab label={label4} {...a11yProps(3)} />
          </Tabs>
        </Box>
      </div>
      <CustomTabPanel value={value} index={0}>
        <NotifyClient />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <EmailClient />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <RecievedMessages />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <SentMessages />
      </CustomTabPanel>
    </div>
  );
}
