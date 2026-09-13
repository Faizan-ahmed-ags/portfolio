import certificateData from './certificates.json';

export type Certificate = {
  id: string;
  kind: 'Award' | 'Certificate' | 'Participation';
  eyebrow: string;
  title: string;
  issuer: string;
  description?: string;
  date: string;
  dateLabel: string;
  image: string;
  document?: string;
  verifyUrl?: string;
  featured?: boolean;
};

export const certificates = certificateData as Certificate[];
