'use client';

import { useEffect } from 'react';

export default function CredlyBadge() {
  useEffect(() => {
    // Load Credly embed script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//cdn.credly.com/assets/utilities/embed.js';
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      data-iframe-width="150" 
      data-iframe-height="270" 
      data-share-badge-id="3a39b500-354b-46c8-887b-e3a88b50c6e0" 
      data-share-badge-host="https://www.credly.com"
    />
  );
}
