import React, { useEffect, useState } from 'react';

function Imagen({ archivo, alt = '', oscuro = false, className = '', style }) {
  const [extension, setExtension] = useState('png');

  useEffect(() => {
    setExtension('png');
  }, [archivo]);

  if (extension === 'ninguna') {
    return (
      <div className={`img-placeholder ${oscuro ? 'img-placeholder-dark' : ''} ${className}`} style={style}>
        {archivo}.png
      </div>
    );
  }

  return (
    <img
      src={`/img/${archivo}.${extension}`}
      alt={alt}
      className={`img-foto ${className}`}
      style={style}
      onError={() => setExtension(extension === 'png' ? 'jpg' : 'ninguna')}
    />
  );
}

export default Imagen;
