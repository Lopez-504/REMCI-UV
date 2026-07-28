import React, { useState } from "react";

// CSS
import "./maintenance.css";

import { STATIONS } from '../constants/stations';
import logo from "/remci_logo.png"

// COMPONENTS
import HelpTooltip from "./HelpTooltip";

// Translations
import { useTranslation } from "react-i18next";

// PDF
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import stationDiagram from "/images/estacionUV.png";

const checklist = [
  "solarPanelAndVoltage",
  "cleanRadAndTemp",
  "rainGauge",
  "anemomenter",
  "corosion",
  "dataLogger",
  "synchronization",
  "stability",
  "photograph",
  "documentObsRepl",
];

const station_info = [
  "type",
  "power",
  "telemetry",
  "mainInterval",
];

// ACTUAL COMPONENT
function Maintenance() {
  const { t, i18n } = useTranslation("maintenance");

  const [selectedStation, setSelectedStation] = useState(STATIONS[0]);
  
  const selectStation = (station) => {
    setSelectedStation(station);
    setIndex(0);
  };

  const [checkedItems, setCheckedItems] = useState(
    checklist.reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {})
  );

  const [technician, setTechnician] = useState("");
  const [notes, setNotes] = useState("");

  const toggleItem = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF({format:'letter'});

    doc.addImage(logo, 'PNG', 166, 7, 36, 36);

    doc.setFontSize(20);
    doc.text(t("report.title"), 14, 18);   //content, horizontal, vertical

    doc.setFontSize(11);
    doc.text(
      `${t("station")}: ${selectedStation.name}`,
      14,28
    );

    doc.text(
      `${t("report.date")}: ${new Date().toLocaleDateString(
        i18n.language
      )}`,
      14,36
    );

    doc.text(
      `${t("report.technician")}: ${
        technician || t("report.notSpecified")
      }`,
      14,44
    );

    //Summary
    const completed = Object.values(checkedItems).filter(Boolean).length;
    const total = checklist.length;
    const pending = total - completed;
 
    doc.setTextColor(46, 125, 50); 
    doc.text(
      `${t("report.tasksCompleted")}: ${completed}/${total}`,
      14,52
    );

    doc.setTextColor(198, 40, 40); 
    doc.text(
      `${t("report.tasksPending")}: ${pending}/${total}`,
      14,58
    );

    doc.setTextColor(0, 0, 0)
    doc.setFont("helvetica", "bold"); 
    doc.text(
      `${t("report.completion")}: ${completed/total*100}%`,
      14,64
    );

    autoTable(doc, {
      startY: 72,
      head: [[t("report.task"), t("report.status")]],
      headStyles: {
        fillColor: [33, 150, 243],      // blue header
        textColor: 255,
        fontStyle: "bold",
      },
      body: checklist.map((item) => [
        t("checklist." + item),
        checkedItems[item]
          ? t("report.completed")
          : t("report.pending"),
      ]),
      theme:'grid',

      didParseCell: function (data) {
        // Status column
        if (data.section === "body" && data.column.index === 1) {
          data.cell.styles.fontStyle = "bold";

          if (data.row.raw[1] === t("report.completed")) {
            data.cell.styles.textColor = [46, 125, 50]; // Material Green 800
          } else {
            data.cell.styles.textColor = [198, 40, 40]; // Material Red 800
          }
        }
      },
    });

    const finalY = doc.lastAutoTable.finalY + 12;
    doc.text(t("report.notes"), 14, finalY);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal"); 
    doc.text(
      notes || t("report.noNotes"),
      14,
      finalY + 8,
      {
        maxWidth: 180,
      }
    );

    //Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setDrawColor(180);
    doc.line(14, pageHeight - 24, 196, pageHeight - 24);
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(
      "REMCI-UV Dashboard",
      14,
      pageHeight - 16
    );

    doc.text(
      `${t("report.generated")}: ${new Date().toLocaleString(i18n.language)}`,
      14,
      pageHeight - 10
    );
    doc.text(
      "v1.0.2",
      196,
      pageHeight - 10,
      { align: "right" }
    );
    const filename = `${selectedStation.name}_Maintenance_${new Date()
      .toISOString()
      .slice(0, 10)}.pdf`;

    doc.save(filename);
  };

  return (
    <section className="maintenance-container">
      <div className="maintenance-header">
        <h1>{t("AWSmaintenance.title")}</h1>
        <p>{t("AWSmaintenance.sub")}</p>
      </div>

      <div className="maintenance-grid">

        {/* Left Panel */}
        <div className="maintenance-card diagram-card">
          <h2>{t("lastMaintenance")}</h2>

          <div className="diagram-wrapper">
            <img
              src={stationDiagram}
              alt="Automatic Weather Station Diagram"
              className="station-diagram"
            />
          </div>

          <div className="station-info">
            {station_info.map((item, index) => (
              <div key={index}>
                <span className="label">
                  {t("info." + item + ".label")}
                </span>

                <span className="value">
                  {t("info." + item + ".value")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="maintenance-card checklist-card">
          <h2>
            {t("MainChecklist")}:
            <select
              value={selectedStation.id}
              onChange={(e) =>
                selectStation(
                  STATIONS.find(s => s.id === e.target.value)     
                )
              }
            >
              {STATIONS.map(st => (
                <option key={st.id} value={st.id}>{st.name}</option>
              ))}
            </select>
          </h2>

          <input
            className="maintenance-input"
            type="text"
            placeholder={t("technician")}
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
          />

          <div className="checklist">
            {checklist.map((item) => (
              <label key={item} className="check-item">
                <input
                  type="checkbox"
                  checked={checkedItems[item]}
                  onChange={() => toggleItem(item)}
                />

                <span>{t("checklist." + item)}</span>
              </label>
            ))}
          </div>

          <textarea
            className="maintenance-notes"
            rows={4}
            placeholder={t("notes")}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button
            className="maintenance-btn"
            onClick={generatePDF}
          >
            {t("saveReport")}
          </button>
        </div>

      </div>
    </section>
  );
}

export default Maintenance;