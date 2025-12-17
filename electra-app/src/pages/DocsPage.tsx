import React from 'react';

interface DocsPageProps {
  onBack: () => void;
}

const DocsPage: React.FC<DocsPageProps> = ({ onBack }) => {
  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    background: '#0b1220',
    color: '#e5e7eb',
    overflow: 'auto',
    padding: '40px 20px'
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: 800,
    margin: '0 auto'
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: 48
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 36,
    fontWeight: 700,
    color: '#60a5fa',
    marginBottom: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 12
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: 18,
    color: '#94a3b8',
    lineHeight: 1.6
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: 40
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 24,
    fontWeight: 600,
    color: '#e5e7eb',
    marginBottom: 20,
    borderBottom: '1px solid #334155',
    paddingBottom: 8
  };

  const stepStyle: React.CSSProperties = {
    display: 'flex',
    gap: 16,
    marginBottom: 24,
    padding: 16,
    background: '#1e293b',
    borderRadius: 8,
    border: '1px solid #334155'
  };

  const stepNumberStyle: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: '#60a5fa',
    color: '#0b1220',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 14,
    flexShrink: 0
  };

  const stepContentStyle: React.CSSProperties = {
    flex: 1
  };

  const stepTitleStyle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    color: '#e5e7eb',
    marginBottom: 8
  };

  const stepDescStyle: React.CSSProperties = {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 1.6
  };

  const backButtonStyle: React.CSSProperties = {
    background: 'transparent',
    border: '1px solid #334155',
    color: '#94a3b8',
    padding: '8px 16px',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
    marginBottom: 32,
    display: 'flex',
    alignItems: 'center',
    gap: 8
  };

  const steps = [
    {
      title: 'Abrir un Grid',
      description: 'Ve a File > Open y selecciona un archivo .gridcal. El grid se cargará y visualizará automáticamente en el visor 2D.'
    },
    {
      title: 'Navegar por el Grid',
      description: 'Usa el ratón para moverte por el grid: arrastra para mover la vista, usa la rueda para hacer zoom. Haz clic en cualquier elemento (bus, línea, generador, carga, shunt o transformador) para ver sus detalles en el panel derecho.'
    },
    {
      title: 'Activar/Desactivar elementos',
      description: 'Selecciona cualquier elemento del grid y usa el switch "Active" en el panel de información para activarlo o desactivarlo. Al desactivar un bus, todos los elementos conectados a él también se desactivarán automáticamente.'
    },
    {
      title: 'Calcular Power Flow',
      description: 'Ve a Analysis > Power Flow para ejecutar el cálculo de flujo de potencia. Se te pedirá confirmación antes de iniciar el cálculo.'
    },
    {
      title: 'Ver los resultados',
      description: 'Una vez calculado el Power Flow, aparecerá un panel en el lado izquierdo con dos pestañas: "Buses" muestra Vm, Va, P y Q para cada bus; "Branches" muestra Pf, Pt, Loading, Ploss y Qloss para líneas y transformadores.'
    },
    {
      title: 'Exportar resultados',
      description: 'En el panel de resultados, haz clic en el icono de descarga junto al título "Power Flow Results" para exportar todos los resultados a un archivo CSV compatible con Excel.'
    }
  ];

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <button style={backButtonStyle} onClick={onBack}>
          ← Volver
        </button>

        <header style={headerStyle}>
          <h1 style={titleStyle}>
            <span>⚡</span>
            <span>Electra - Documentación</span>
          </h1>
          <p style={subtitleStyle}>
            Electra es una aplicación web para la visualización y análisis de redes eléctricas. 
            Permite cargar grids eléctricos, visualizarlos en 2D, modificar el estado de los elementos 
            y ejecutar cálculos de flujo de potencia (Power Flow) para analizar el comportamiento de la red.
          </p>
        </header>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Características principales</h2>
          <ul style={{ color: '#94a3b8', lineHeight: 2, paddingLeft: 20 }}>
            <li>Visualización 2D interactiva de redes eléctricas</li>
            <li>Soporte para .gridcal</li>
            <li>Inspección detallada de buses, líneas, transformadores, generadores, cargas y shunts</li>
            <li>Activación/desactivación de elementos con propagación automática</li>
            <li>Cálculo de flujo de potencia (Power Flow)</li>
            <li>Visualización de resultados por bus y por rama</li>
            <li>Exportación de resultados a CSV</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Guía de uso</h2>
          {steps.map((step, index) => (
            <div key={index} style={stepStyle}>
              <div style={stepNumberStyle}>{index + 1}</div>
              <div style={stepContentStyle}>
                <h3 style={stepTitleStyle}>{step.title}</h3>
                <p style={stepDescStyle}>{step.description}</p>
              </div>
            </div>
          ))}
        </section>

        <section style={{ ...sectionStyle, marginTop: 48, paddingTop: 24, borderTop: '1px solid #334155' }}>
          <h2 style={sectionTitleStyle}>Repositorios</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a 
              href="https://github.com/arnaupuigdemont/electra_front" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#60a5fa', fontSize: 14, textDecoration: 'none' }}
            >
              📁 Frontend: github.com/arnaupuigdemont/electra_front
            </a>
            <a 
              href="https://github.com/arnaupuigdemont/electra_back" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#60a5fa', fontSize: 14, textDecoration: 'none' }}
            >
              📁 Backend: github.com/arnaupuigdemont/electra_back
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocsPage;
