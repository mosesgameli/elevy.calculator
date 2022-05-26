import { useLocation, useNavigate } from "react-router-dom";
import { Calculate, Feedback, Restore } from "@mui/icons-material";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";

function BottomBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const paths = ["/home", "/recents", "/reviews"];

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={paths.indexOf(location.pathname)}
        onChange={(_, change) => {
          navigate(`${paths[change]}`, { replace: true });
        }}
      >
        <BottomNavigationAction label="Calculate" icon={<Calculate />} />
        <BottomNavigationAction label="Recents" icon={<Restore />} />
        <BottomNavigationAction label="Review" icon={<Feedback />} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomBar;
