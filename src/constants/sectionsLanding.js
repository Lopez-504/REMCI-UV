import {
  FaCloudSun,
  FaChartLine,
  FaImages,
  FaDownload,
  FaDatabase,
  FaQuestionCircle
} from "react-icons/fa";

export const SECTIONS = [
    {
        id: "currentConditions",
        title: "Current Conditions",
        icon: FaCloudSun,
        color: "#2d8cff",
        description:
        "Monitor real-time meteorological observations from every station in the REMCI-UV network.",
        items: [
        "Temperature & humidity",
        "Wind speed and direction",
        "Solar radiation",
        "Interactive charts"
        ],
        key: "stations-currentConditions"
    },

    {
        id: "forecast",
        title: "Forecast",
        icon: FaChartLine,
        color: "#f59e0b",
        description:
        "Explore numerical weather predictions and 6-days meteograms.",
        items: [
        "Temperature forecast",
        "Wind forecast",
        "Rainfall",
        "Solar radiation"
        ],
        key: "data-forecast"
    },

    {
        id: "gallery",
        title: "Stations Gallery",
        icon: FaImages,
        color: "#16a34a",
        description:
        "Discover the REMCI-UV monitoring stations and their instrumentation.",
        items: [
        "Station photographs",
        "Measured variables",
        "Technical specifications",
        "Current status"
        ],
        key: "stations-gallery"
    },

    {
        id: 'exportData',
        title: "Export Data",
        icon: FaDownload,
        color: "#7c3aed",
        description:
        "Download historical observations in multiple formats.",
        items: [
        "CSV",
        "Date filters",
        "Variable and Station selection",
        "Export your own charts"
        ],
        key: "data-download"
    },

    {
        id: 'dataAvailability',
        title: "Data Availability",
        icon: FaDatabase,
        color: "#0891b2",
        description:
        "Inspect station uptime and historical data completeness.",
        items: [
        "Availability plots",
        "Missing records",
        "Sensor status",
        "Coverage"
        ],
        key: "data-historic"
    },

    {
        id: 'help',
        title: "Help",
        icon: FaQuestionCircle,
        color: "#6b7280",
        description:
        "Learn how to use the dashboard and understand each visualization.",
        items: [
        "Export tutorial",
        "Wind rose guide",
        "Forecast interpretation",
        "Educational resources"
        ],
        key: "about-glossary"
    }
];