import type React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Certificate } from '../types';

const CertificateCard: React.FC<{ data: Certificate }> = ({ data }) => {
  const date = <>{data.year}{data.expired && <span className="ml-2 text-amber-300">Expired</span>}</>;

  return (
    <li className="py-4 sm:grid sm:grid-cols-[6rem_1fr] sm:gap-4">
      <span className="hidden pt-1 font-mono text-xs text-textSecondary sm:block">{date}</span>
      <div>
        <h3 className="text-base font-semibold leading-snug text-textPrimary">{data.title}</h3>
        <p className="mt-1 text-sm text-textSecondary">
          {data.issuer}<span className="sm:hidden"> · {date}</span>
        </p>
        {data.description && <p className="mt-2 text-sm leading-relaxed text-textSecondary">{data.description}</p>}
        {data.link && (
          <a href={data.link} target="_blank" rel="noopener noreferrer"
            aria-label={`View ${data.title} credential on ${data.platform}`}
            className="inline-flex min-h-[44px] items-center gap-1 rounded-sm text-sm font-medium text-accent-teal hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-teal">
            View credential on {data.platform} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </li>
  );
};

export default CertificateCard;
