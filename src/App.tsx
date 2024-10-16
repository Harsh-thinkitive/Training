import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ClearIcon, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import {
  FaAngleDown,
  FaAngleUp,
  FaCopy,
  FaRegClock,
  FaSearch,
} from "react-icons/fa";
import {
  Autocomplete,
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from "@mui/material";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setstartDate] = React.useState<Dayjs | null>(
    dayjs("2022-04-17")
  );
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs("2022-04-17")
  );
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [browserTime, setBrowserTime] = useState("TimeZone");
  const [selectedMonth, setSelectedMonth] = useState("");
  const timeIntervalsDefault = [
    "Last 5 minutes",
    "Last 15 minutes",
    "Last 30 minutes",
    "Last 1 hour",
    "Last 3 hours",
    "Last 6 hours",
    "Last 12 hours",
    "Last 24 hours",
    "Last 2 days",
    "Last 5 minutes",
    "Last 15 minutes",
    "Last 30 minutes",
    "Last 1 hour",
    "Last 3 hours",
    "Last 6 hours",
    "Last 12 hours",
    "Last 24 hours",
    "Last 2 days",
  ];

  const timeZones = [
    { country: "India", city: "Pune", utcOffset: "+5:30" },
    { country: "USA", city: "New York", utcOffset: "-5:00" },
    { country: "Australia", city: "Sydney", utcOffset: "+11:00" },
    { country: "Japan", city: "Tokyo", utcOffset: "+9:00" },
    { country: "UK", city: "London", utcOffset: "+1:00" },
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [timeIntervals, setTimeIntervals] = useState(timeIntervalsDefault);
  const [settingsExpand, setSettingsExpand] = useState(false);

  const searchTimeInterval = (e: any) => {
    setSearchValue(e.target.value);
    if (e.target.vale == "") {
      setTimeIntervals(timeIntervalsDefault);
    } else {
      let filteredTime = timeIntervalsDefault.filter((item) =>
        item.toLowerCase().includes(e.target.value)
      );
      console.log(e.target.value);

      setTimeIntervals(filteredTime);
    }
  };

  return (
    <>
      <nav style={{ width: "100%", backgroundColor: "white", padding: "10px" }}>
        <div
          title={`${startDate} to ${endDate}`}
          style={{ cursor: "pointer", padding: "10px" }}
          onClick={() => setIsMainModalOpen(!isMainModalOpen)}
        >
          <span>
            <FaRegClock />
          </span>
          <label style={{ margin: "5px" }}>
            {`${startDate} to ${endDate}`}{" "}
          </label>
          {isMainModalOpen ? (
            <span>
              <FaAngleUp />
            </span>
          ) : (
            <span>
              <FaAngleDown />
            </span>
          )}
        </div>
        {isMainModalOpen && (
          <div style={{ width: "50%", padding: "5px" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "60%",
                    minHeight: "26vh",
                    overflow: "scroll",
                    overflowX: "hidden",
                    padding: "10px",
                    maxHeight: "26vh",
                  }}
                >
                  <h5>Absolute time range</h5>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    From
                    <DatePicker
                      value={startDate}
                      onChange={(newvalue) => setstartDate(newvalue)}
                      slotProps={{ textField: { size: "small" } }}
                    />
                    To
                    <DatePicker
                      value={endDate}
                      onChange={(newvalue) => setEndDate(newvalue)}
                      slotProps={{ textField: { size: "small" } }}
                    />
                  </LocalizationProvider>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "10%",
                      justifyContent: "space-between",
                    }}
                  >
                    <button>
                      <FaCopy />
                    </button>
                    <button>
                      <FaCopy />
                    </button>
                    <button
                      style={{
                        width: "78%",
                        height: "30px",
                        backgroundColor: "blue",
                        color: "white",
                      }}
                    >
                      Apply time range
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "38%",
                    minHeight: "26vh",
                    maxHeight: "26vh",
                  }}
                >
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Search"
                    value={searchValue}
                    onChange={searchTimeInterval}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaSearch />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          {searchValue != "" ? (
                            <IconButton
                              type="button"
                              onClick={() => {
                                setSearchValue("");
                                setTimeIntervals(timeIntervalsDefault);
                              }}
                              aria-label="clear"
                            >
                              <ClearIcon />{" "}
                              <span style={{ fontSize: "15px" }}>Clear</span>
                            </IconButton>
                          ) : (
                            ""
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div style={{ overflow: "scroll", overflowX: "hidden" }}>
                    {timeIntervals.map((ele: any) => {
                      return <div>{ele}</div>;
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ padding: "10px" }}>Browser Time</div>
                <div style={{ padding: "10px", margin: "5px" }}>
                  <button onClick={() => setSettingsExpand(!settingsExpand)}>
                    Change Time Settings
                  </button>
                </div>
              </div>
              {/* {settingsExpand ? <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "22%",
                  border: "1px solid black",
                }}
              >
                <div
                  style={{ padding: "11px" }}
                  className={
                    browserTime == "TimeZone" ? "timeZoneSelected" : ""
                  }
                  onClick={() => {
                    setBrowserTime("TimeZone");
                  }}
                >
                  TimeZone
                </div>
                <div
                  style={{ padding: "10px" }}
                  className={
                    browserTime == "FiscalYear" ? "timeZoneSelected" : ""
                  }
                  onClick={() => {
                    setBrowserTime("FiscalYear");
                  }}
                >
                  Fiscal Year
                </div>
              </div> : ""} */}

              <ButtonGroup
                variant="text"
                aria-label="text button group"
                sx={{
                  border: "1px solid grey",
                  padding: "1px",
                  borderRadius: "0px",
                }}
              >
                <Button
                  sx={{
                    color: browserTime == "TimeZone" ? "black" : "grey",
                    background:
                      browserTime == "TimeZone" ? "lightgrey" : "white",
                    border: "none",
                  }}
                  onClick={() => {
                    setBrowserTime("TimeZone");
                  }}
                >
                  Time Zone
                </Button>
                <Button
                  sx={{
                    color: browserTime == "FiscalYear" ? "black" : "grey",
                    background:
                      browserTime == "FiscalYear" ? "lightgrey" : "white",
                  }}
                  onClick={() => {
                    setBrowserTime("FiscalYear");
                  }}
                >
                  Fiscal Year
                </Button>
              </ButtonGroup>
              {browserTime == "TimeZone" && settingsExpand ? (
                <div style={{ marginTop: "10px" }}>
                  <Stack spacing={2} sx={{ width: 650 }}>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={timeZones.map((option) => option.city)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="type or select time zones"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <InputAdornment position="end">
                                <FaSearch />
                              </InputAdornment>
                            ),
                          }}
                          size="small"
                        />
                      )}
                    />
                  </Stack>
                </div>
              ) : (
                ""
              )}
              {browserTime == "FiscalYear" && settingsExpand ? (
                <div>
                  {" "}
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-name-label">Month</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      input={<OutlinedInput label="Name" />}
                      size="small"
                      style={{
                        width : "50%"
                      }}
                    >
                      {months.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default App;
