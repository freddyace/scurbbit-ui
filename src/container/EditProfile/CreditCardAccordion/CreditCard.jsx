import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BasicAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ color: `gray` }}>xxxx-xxxx-xxxx-1677</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Type: Visa <i class="fa fa-cc-visa" style={{ color: `blue` }}></i>{" "}
            (Primary)
            <br></br>
            Transactions: 3<br></br>
            Added on: 01/21/2022<br></br>
            Last used: 03/11/2022<br></br>
          </Typography>
          <div className="row">
            <div className="col-md-12 content-right">
              <button className="btn btn-danger form-btn" type="reset">
                Delete{" "}
              </button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={{ color: `gray` }}>xxxx-xxxx-xxxx-6672</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Type: Mastercard{" "}
            <i class="fa fa-cc-mastercard" style={{ color: `black` }}></i>
            <br></br>
            Transactions: 3<br></br>
            Added on: 01/21/2022<br></br>
            Last used: 03/11/2022<br></br>
          </Typography>
          <div className="row">
            <div className="col-md-12 content-right">
              <button className="btn btn-danger form-btn">SAVE </button>
              <button
                className="btn btn-primary form-btn"
                style={{ backgroundColor: `green`, border: `none` }}
                type="reset"
              >
                Set as primary{" "}
              </button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}
    </div>
  );
}
