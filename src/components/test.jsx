import { useSearchParams } from 'react-router-dom';

export default function testSection() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Read values (provide defaults if the URL is empty)
  const isChecked = searchParams.get('showGrid') === 'true';
  const plotType = searchParams.get('type') || 'linear';

  // 2. Update values
  const handleCheckboxChange = (e) => {
    // We update the URL, which triggers a re-render
    setSearchParams({
      ...Object.fromEntries(searchParams), // keep existing params
      showGrid: e.target.checked,
    });
  };

  return (
    <div>
      <input 
        type="checkbox" 
        checked={isChecked} 
        onChange={handleCheckboxChange} 
      />
      <label>Show Grid</label>
      {/* Your Plot Component logic here */}
    </div>
  );
}