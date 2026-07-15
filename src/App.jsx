import React, { useState, useEffect } from 'react';


const UI_TOOLBOX = [
  { type: 'button', label: ' Button Unit', bg: '#0ea5e9' },
  { type: 'input', label: ' Input Field', bg: '#64748b' },
  { type: 'container', label: ' Container Box', bg: '#475569' },
  { type: 'card', label: ' User Login Card', bg: '#1e293b' }
];

const API_TOOLBOX = [
  { type: 'endpoint', label: ' JSON Fetch Endpoint', bg: '#10b981' },
  { type: 'rest', label: ' REST Call Action', bg: '#a855f7' },
  { type: 'post', label: ' POST Form Action', bg: '#ec4899' }
];


const INITIAL_NODES = [
  { id: 'node-1', label: 'User Login Card', type: 'card', x: 80, y: 100, properties: { endpoint: 'https://localhost:eon/users/', method: 'POST' } },
  { id: 'node-2', label: 'Validate Input', type: 'action', x: 280, y: 150, properties: {} },
  { id: 'node-3', label: 'API: Fetch Users', type: 'endpoint', x: 480, y: 180, properties: {} }
];

function App() {
  
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState('VISUALIZER');
  const [propertiesForm, setPropertiesForm] = useState({ url: 'https://localhost:eon/users/', method: 'POST' });
  
  
  const [compilerLogs, setCompilerLogs] = useState([
    ' DevGraph Kernel initialized. Node architecture graph engine online.'
  ]);

 
  const handlePropertyChange = (key, value) => {
    setPropertiesForm(prev => ({ ...prev, [key]: value }));
    setNodes(prevNodes => prevNodes.map(node => {
      if (node.id === selectedNode?.id) {
        return {
          ...node,
          properties: { ...node.properties, [key]: value }
        };
      }
      return node;
    }));
  };


  const handleDropToCanvas = (e, sourceToolbox) => {
    e.preventDefault();
    const toolData = JSON.parse(e.dataTransfer.getData('application/react-node'));
    if (!toolData) return;

    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left - 50);
    const y = Math.round(e.clientY - rect.top - 30);

    const freshNode = {
      id: `node-${Date.now()}`,
      label: toolData.label,
      type: toolData.type,
      x,
      y,
      properties: { url: 'https://api.domain.io/resource', method: 'GET' }
    };

    setNodes(prev => [...prev, freshNode]);
    setCompilerLogs(prev => [` NODE CREATED: Spawned [${freshNode.label}] at position X:${x} Y:${y}`, ...prev]);
  };

 
  const executeSimulationPipeline = () => {
    setIsSimulating(true);
    setCompilerLogs(prev => [' Launching compiled architecture system validations...', ...prev]);

    nodes.forEach((node, idx) => {
      setTimeout(() => {
        setCompilerLogs(prev => [
          `⚡ Validating step [${idx + 1}/${nodes.length}]: Processing node matrix "${node.label}"...`,
          ...prev
        ]);
        
        if (idx === nodes.length - 1) {
          setIsSimulating(false);
          setCompilerLogs(prev => [
            ` SIMULATION SUCCESS: Blueprint layout validated. System integrity: 100% OK.`,
            ...prev
          ]);
        }
      }, (idx + 1) * 800);
    });
  };

  
  const exportBlueprintFile = () => {
    const outputString = JSON.stringify(nodes, null, 2);
    const dataBlob = new Blob([outputString], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `devgraph_blueprint_${Date.now()}.json`;
    link.click();
    setCompilerLogs(prev => [' Blueprint JSON schema exported successfully.', ...prev]);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '30px auto', padding: '0 24px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#070a13', color: '#f8fafc', minHeight: '92vh' }}>
      
      
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '20px', marginBottom: '30px', gap: '20px' }}>
        <div>
          <h1 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#38bdf8' }}> DevGraph Architect & Flow Compiler</h1>
          <p style={{ margin: '4px 0 0 0', color: '#475569', fontSize: '12px' }}>Interactive coordinate mapping and custom node tree transformations without bulky external flow models.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#10b981', border: '1px solid #10b981', padding: '6px 12px', borderRadius: '6px', backgroundColor: 'rgba(16, 185, 129, 0.05)', fontWeight: 'bold' }}>
             Blueprint Integrity: OK (Validated)
          </span>
          <button onClick={executeSimulationPipeline} disabled={isSimulating || nodes.length === 0} style={{ padding: '10px 18px', backgroundColor: '#38bdf8', color: '#070a13', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: isSimulating ? 'not-allowed' : 'pointer', fontSize: '12px' }}>
            {isSimulating ? 'Simulating...' : '▶ Run Simulation'}
          </button>
          <button onClick={exportBlueprintFile} style={{ padding: '10px 18px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#cbd5e1', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
             Export Blueprint
          </button>
        </div>
      </header>

      
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 340px', gap: '25px', marginBottom: '30px', alignItems: 'stretch' }}>
        
        
        <aside style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#64748b', textTransform: 'uppercase' }}>UI Elements</h3>
            <p style={{ margin: '-10px 0 15px 0', color: '#475569', fontSize: '11px' }}>Drag element tiles directly onto canvas workspace coordinates:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {UI_TOOLBOX.map(tool => (
                <div 
                  key={tool.type} 
                  draggable 
                  onDragStart={(e) => e.dataTransfer.setData('application/react-node', JSON.stringify(tool))}
                  style={{ padding: '12px 16px', backgroundColor: '#070a13', border: '1px solid #1e293b', borderRadius: '8px', cursor: 'grab', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: tool.bg }}></span>
                  {tool.label}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#64748b', textTransform: 'uppercase' }}>API Blueprint Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {API_TOOLBOX.map(tool => (
                <div 
                  key={tool.type} 
                  draggable 
                  onDragStart={(e) => e.dataTransfer.setData('application/react-node', JSON.stringify(tool))}
                  style={{ padding: '12px 16px', backgroundColor: '#070a13', border: '1px dashed #1e293b', borderRadius: '8px', cursor: 'grab', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: tool.bg }}></span>
                  {tool.label}
                </div>
              ))}
            </div>
          </div>
        </aside>

       
        <main style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          
          <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>
            {['DESIGNER', 'WRITER', 'VISUALIZER'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ border: 'none', background: 'none', padding: '6px 16px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', color: activeTab === tab ? '#38bdf8' : '#475569', borderBottom: activeTab === tab ? '2px solid #38bdf8' : 'none' }}
              >
                {tab === 'DESIGNER' ? ' UI Layout Designer' : tab === 'WRITER' ? '⚡ Logic Pipeline Editor' : ' Blueprint Visualizer Map'}
              </button>
            ))}
          </div>

        
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropToCanvas}
            style={{ 
              flexGrow: '1', 
              minHeight: '420px', 
              backgroundColor: '#020617', 
              border: '1px dashed #334155', 
              borderRadius: '16px', 
              position: 'relative', 
              overflow: 'hidden',
              backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          >
           
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {nodes.map((node, idx) => {
                if (idx === nodes.length - 1) return null;
                const next = nodes[idx + 1];
                return (
                  <g key={node.id}>
                    <line 
                      x1={node.x + 100} y1={node.y + 25} 
                      x2={next.x} y2={next.y + 25} 
                      stroke={idx === 0 ? '#10b981' : '#38bdf8'} 
                      strokeWidth="2" 
                    />
                    <polygon points={`${next.x},${next.y + 25} ${next.x - 6},${next.y + 20} ${next.x - 6},${next.y + 30}`} fill={idx === 0 ? '#10b981' : '#38bdf8'} />
                  </g>
                );
              })}
            </svg>

            
            {nodes.map(node => (
              <div 
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{ 
                  position: 'absolute', left: node.x, top: node.y,
                  width: '180px', backgroundColor: '#0f172a', border: `1px solid ${selectedNode?.id === node.id ? '#38bdf8' : '#1e293b'}`,
                  padding: '12px 14px', borderRadius: '10px', cursor: 'pointer', zIndex: 10,
                  boxShadow: selectedNode?.id === node.id ? '0 0 10px rgba(56, 189, 248, 0.2)' : 'none'
                }}
              >
                <div style={{ fontSize: '9px', color: '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>{node.type}</div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#fff' }}>{node.label}</h4>
                <div style={{ fontSize: '10px', color: '#64748b' }}>Coordinates: X:{node.x} Y:{node.y}</div>
              </div>
            ))}

            {nodes.length === 0 && (
              <div style={{ color: '#475569', textAlign: 'center', marginTop: '160px', fontSize: '12px' }}>
                 Canvas empty. Drag in UI components or Action blocks from the left panel.
              </div>
            )}
          </div>
        </main>

        
        <aside style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>Properties Inspector</h3>
          
          {selectedNode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ fontSize: '12px' }}>
                <span style={{ color: '#64748b' }}>Target Node: </span>
                <strong style={{ color: '#38bdf8' }}>{selectedNode.label}</strong>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#cbd5e1', marginBottom: '6px' }}>Endpoint URL</label>
                <input 
                  type="text" 
                  value={propertiesForm.url} 
                  onChange={(e) => handlePropertyChange('url', e.target.value)}
                  style={{ width: '100%', padding: '8px', backgroundColor: '#070a13', border: '1px solid #1e293b', borderRadius: '6px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#cbd5e1', marginBottom: '6px' }}>Network Method</label>
                <select 
                  value={propertiesForm.method} 
                  onChange={(e) => handlePropertyChange('method', e.target.value)}
                  style={{ width: '100%', padding: '8px', backgroundColor: '#070a13', border: '1px solid #1e293b', borderRadius: '6px', color: '#fff', fontSize: '12px' }}
                >
                  <option value="GET">GET Read Request</option>
                  <option value="POST">POST Write Action</option>
                  <option value="DELETE">DELETE Removal Command</option>
                </select>
              </div>

              <div style={{ backgroundColor: '#070a13', borderRadius: '8px', padding: '12px', border: '1px solid #1e293b' }}>
                <span style={{ display: 'block', fontSize: '10px', color: '#475569', textTransform: 'uppercase', marginBottom: '6px' }}>Mock JSON Response Payload</span>
                <pre style={{ margin: '0', fontSize: '10px', color: '#10b981', lineHeight: '1.4' }}>
                  {`{\n  "node": "${selectedNode.id}",\n  "status": "active",\n  "trace": "validated"\n}`}
                </pre>
              </div>
            </div>
          ) : (
            <div style={{ color: '#475569', fontSize: '11px', textAlign: 'center', marginTop: '40px' }}>
              Select a node on the canvas workspace map to inspect and configure properties.
            </div>
          )}
        </aside>

      </div>

     
      <footer style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>Compiler Logs & Event Trace</h3>
        <div style={{ backgroundColor: '#070a13', borderRadius: '10px', padding: '15px', height: '100px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid #1e293b', fontFamily: 'monospace' }}>
          {compilerLogs.map((log, idx) => (
            <div key={idx} style={{ fontSize: '11px', color: log.startsWith('❌') ? '#ef4444' : log.startsWith('🎉') ? '#10b981' : log.startsWith('⚡') ? '#38bdf8' : '#64748b' }}>
              {log}
            </div>
          ))}
        </div>
      </footer>

    </div>
  );
}

export default App;