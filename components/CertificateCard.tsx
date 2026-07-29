import React from 'react';
import { Certificate } from '../types';
import { ShieldCheck, Award, ExternalLink, BadgeCheck } from 'lucide-react';

interface CertificateCardProps {
  data: Certificate;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ data }) => {
  const isExpired = data.description?.toLowerCase().includes('expired');

  const content = (
    <div className="group relative p-5 sm:p-6 rounded-xl transition-all duration-300 border border-white/10 hover:border-accent-teal/40 bg-white/[0.02] hover:bg-accent-teal/[0.03] mb-5 overflow-hidden select-none shadow-sm hover:shadow-accent-teal/5">
      {/* High-tech Corner Accents */}
      <div className="absolute top-2 left-2 text-white/10 group-hover:text-accent-teal/30 font-mono text-[9px] transition-colors pointer-events-none">+</div>
      <div className="absolute top-2 right-2 text-white/10 group-hover:text-accent-teal/30 font-mono text-[9px] transition-colors pointer-events-none">+</div>
      <div className="absolute bottom-2 left-2 text-white/10 group-hover:text-accent-teal/30 font-mono text-[9px] transition-colors pointer-events-none">+</div>
      <div className="absolute bottom-2 right-2 text-white/10 group-hover:text-accent-teal/30 font-mono text-[9px] transition-colors pointer-events-none">+</div>

      {/* Top Header Status Bar */}
      <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-white/5 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${isExpired ? 'bg-amber-400' : 'bg-accent-teal animate-pulse'}`} />
          <span className="uppercase tracking-wider text-textSecondary group-hover:text-textPrimary transition-colors flex items-center gap-1">
            <BadgeCheck size={13} className="text-accent-teal" />
            <span>{isExpired ? 'HISTORIC CREDENTIAL' : 'VERIFIED CREDENTIAL'}</span>
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-white/5 group-hover:bg-accent-teal/10 text-accent-teal font-semibold text-[10px] tracking-widest uppercase transition-colors">
          {data.year}
        </span>
      </div>

      {/* Main Content Body */}
      <div className="space-y-3">
        {/* Title & Issuer Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="font-mono font-bold text-textPrimary text-base sm:text-[17px] tracking-tight group-hover:text-accent-teal transition-colors flex items-center gap-2">
              <span>{data.title}</span>
              {data.link && (
                <ExternalLink size={14} className="text-accent-teal opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
              )}
            </h3>
            <p className="text-textSecondary/90 font-mono text-xs flex items-center gap-1.5">
              <span className="text-accent-teal/60">ISSUED BY //</span>
              <span className="text-textPrimary font-semibold">{data.issuer}</span>
            </p>
          </div>
          <div className="p-2 rounded-lg bg-white/5 text-textSecondary/40 group-hover:text-accent-teal group-hover:bg-accent-teal/10 transition-all flex-shrink-0">
            {data.title.toLowerCase().includes('cyber') ? (
              <ShieldCheck size={20} />
            ) : (
              <Award size={20} />
            )}
          </div>
        </div>

        {/* Description */}
        {data.description && (
          <p className="text-textSecondary text-xs leading-relaxed font-sans pt-0.5">
            {data.description}
          </p>
        )}

        {/* Credential ID */}
        {data.credentialId && (
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded bg-black/40 text-textSecondary border border-white/5">
              <span className="text-white/40">ID:</span>
              <span className="text-accent-teal font-medium">{data.credentialId}</span>
            </span>
          </div>
        )}

        {/* Skill Badges */}
        {data.skills && data.skills.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-1.5 border-t border-white/5">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-accent-teal/5 text-textSecondary group-hover:text-accent-teal group-hover:bg-accent-teal/10 border border-white/5 group-hover:border-accent-teal/20 transition-all"
              >
                #{skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (data.link) {
    return (
      <a href={data.link} target="_blank" rel="noopener noreferrer" className="block text-left cursor-pointer">
        {content}
      </a>
    );
  }

  return content;
};

export default CertificateCard;
