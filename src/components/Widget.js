import React from "react";
import "../CSS/widget.css";
import InfoIcon from "@mui/icons-material/Info";

function Widget() {
  return (
    <div className="widget">
      <div className="widget_top">
        <div className="widget_header">
          <h4>LinkedIn News</h4>
          <InfoIcon />
        </div>
        <div className="widget_body">
          <ul className="widget_options">
            <li>
              <h4>Slaying Job Search Fees</h4>
              <p>6d ago * 4, 55 readers</p>
            </li>
            <li>
              <h4>A Two Pizza rule for eating</h4>
              <p>2d ago * 6, 12 readers</p>
            </li>
            <li>
              <h4>How to handle a Workplace breakup</h4>
              <p>3d ago * 4, 45 readers</p>
            </li>
            <li>
              <h4>Flexi leave is the new Flexi</h4>
              <p>4d ago * 3, 55 readers</p>
            </li>
            <li>
              <h4>A Two Pizza rule for eating</h4>
              <p>8d ago * 6, 12 readers</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="widget_bottom">
        <div className="widget_header">
          <h4>Todays top Courses</h4>
          <InfoIcon />
        </div>
        <div className="widget_body">
          <ul>
            <h4>Leading with a Heavey Heat</h4>
            <p>Kay Coly</p>
          </ul>

          <ul>
            <h4>Leading with a Heavey Heat</h4>
            <p>Kay Coly</p>
          </ul>

          <ul>
            <h4>Leading with a Heavey Heat</h4>
            <p>Kay Coly</p>
          </ul>

          <ul>
            <h4>Leading with a Heavey Heat</h4>
            <p>Kay Coly</p>
          </ul>

          <ul>
            <h4>Leading with a Heavey Heat</h4>
            <p>Kay Coly</p>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Widget;
