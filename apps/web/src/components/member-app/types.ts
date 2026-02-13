export type SabbathStage = 'prep' | 'ready' | 'warning' | 'sabbath';

export const SABBATH_STAGES = {
    'prep': { colorClass: 'from-blue-600 to-blue-400', statusText: 'Preparation Call', subText: 'Wrap up work • 30m Remaining', timer: '00:30:00', progress: '50%', progressColor: 'bg-blue-300', toast: { title: 'Preparation Call', msg: 'Sunset in 30 mins.', icon: 'bell' } },
    'ready': { colorClass: 'from-yellow-600 to-yellow-500', statusText: 'Household Ready', subText: 'Candle Prep • 18m Remaining', timer: '00:18:00', progress: '70%', progressColor: 'bg-yellow-300', toast: { title: 'Household Ready', msg: '18 mins to sunset.', icon: 'flame' } },
    'warning': { colorClass: 'from-orange-600 to-orange-500', statusText: 'Final Warning', subText: 'Sunset Imminent • 5m Remaining', timer: '00:05:00', progress: '90%', progressColor: 'bg-orange-300', toast: { title: 'Final Warning', msg: '5 mins remaining.', icon: 'alert-triangle' } },
    'sabbath': { colorClass: 'from-indigo-900 to-purple-800', statusText: 'Sabbath Entered', subText: 'Holy Time', timer: '00:00:00', progress: '100%', progressColor: 'bg-indigo-300', toast: null }
};

export type ModalType = 'giving' | 'bible' | 'lesson' | 'audio' | 'hymnal' | 'worship' | 'tech-prep' | 'officer' | 'events' | 'profile' | 'bulletin' | null;

export interface Tenant {
    id: string;
    name: string;
    slug: string;
    customDomain?: string | null;
    logo?: string | null;
    branding?: any;
}

