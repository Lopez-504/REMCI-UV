const SectionTabs = ({ activeSection, setActiveSection }) => {
  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'stations', label: 'Stations' },
    { key: 'data', label: 'Data' },
    { key: 'about', label: 'About REMCI-UV' }
  ];

  return (
    <div className="section-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={activeSection === tab.key ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveSection(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SectionTabs;