import React from 'react';
import { Certificate } from '../types';

interface CertificateCardProps {
  data: Certificate;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ data }) => {
  return (
    <div className="group relative grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 p-6 rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/5 hover:shadow-lg mb-4 border border-transparent">
      <header className="font-mono text-xs font-semibold uppercase tracking-wide text-textSecondary mt-1">
        {data.year}
      </header>
      <div className="z-10">
        <h3 className="font-medium text-textPrimary text-base mb-1 group-hover:text-accent-teal transition-colors">
          {data.title}
          <span className="inline-block transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 ml-1">
            ↗
          </span>
        </h3>
        <p className="text-textSecondary text-sm">
          Issued by {data.issuer}
        </p>
      </div>
    </div>
  );
};

export default CertificateCard;
