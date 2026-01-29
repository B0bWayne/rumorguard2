
import { RumorCategory, RumorStatus, ReportSource, RumorReport, VHTStats } from './types';

export const DISTRICTS = [
  'Kampala', 'Wakiso', 'Gulu', 'Mbarara', 'Lira', 'Jinja', 'Mbale', 'Arua', 'Entebbe', 'Kasese'
];

export const INITIAL_RUMORS: RumorReport[] = [
  {
    id: '1',
    content: 'Rumors that the new malaria vaccine causes infertility in young girls are spreading in Kasangati.',
    category: RumorCategory.VACCINES,
    location: 'Kasangati, Wakiso',
    status: RumorStatus.HARMFUL,
    source: ReportSource.SMS,
    timestamp: new Date().toISOString(),
    riskScore: 88,
    isVerified: true,
    explainer: 'Scientific studies show no link between the malaria vaccine and fertility. It is safe and protects children.',
    district: 'Wakiso'
  },
  {
    id: '2',
    content: 'Someone on WhatsApp claims that lemon water cures HIV if taken three times a day.',
    category: RumorCategory.HIV,
    location: 'Online',
    status: RumorStatus.HARMFUL,
    source: ReportSource.SOCIAL,
    timestamp: new Date().toISOString(),
    riskScore: 92,
    isVerified: true,
    explainer: 'There is currently no cure for HIV. Only ARVs can effectively manage the virus.',
    district: 'Kampala'
  },
  {
    id: '3',
    content: 'Community members are asking if they should stop sleeping under nets because of "chemicals".',
    category: RumorCategory.MALARIA,
    location: 'Bwaise',
    status: RumorStatus.UNCLEAR,
    source: ReportSource.APP,
    timestamp: new Date().toISOString(),
    riskScore: 45,
    isVerified: false,
    district: 'Kampala'
  }
];

export const MOCK_VHTS: VHTStats[] = [
  { id: 'v1', name: 'Mugisha John', district: 'Wakiso', parish: 'Kasangati', points: 450, reportsCount: 22 },
  { id: 'v2', name: 'Nalubega Sarah', district: 'Kampala', parish: 'Bwaise', points: 380, reportsCount: 18 },
  { id: 'v3', name: 'Okello Peter', district: 'Gulu', parish: 'Pece', points: 310, reportsCount: 15 },
  { id: 'v4', name: 'Atwine Mary', district: 'Mbarara', parish: 'Ruti', points: 290, reportsCount: 14 }
];
