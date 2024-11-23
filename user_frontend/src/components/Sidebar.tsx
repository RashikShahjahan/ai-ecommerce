import SidebarItem from './SidebarItem';
import { EssenceItem } from '../types';

// Mock data
const mockEssences: EssenceItem[] = [
    {
        id: '1',
        name: 'Moonlit Whispers',
        description: 'Captured during the full moon',
        rarity: 'common',
        imageUrl: 'https://placeholder.com/100'
    },
    {
        id: '2',
        name: "Dragon's Breath",
        description: 'Essence of ancient wyrms',
        rarity: 'rare',
        imageUrl: 'https://placeholder.com/100'
    },
    {
        id: '3',
        name: 'Starfall Memory',
        description: 'A meteor shower in a bottle',
        rarity: 'legendary',
        imageUrl: 'https://placeholder.com/100'
    },
    // Add more mock items as needed
];

const Sidebar = () => {
    const handleItemClick = (item: EssenceItem) => {
        console.log('Selected essence:', item);
        // Handle item selection here
    };

    return (
        <div className="w-80 h-screen bg-gray-900/50 backdrop-blur-sm p-4 border-r border-purple-500/20">
            <h2 className="text-2xl font-serif text-purple-100 mb-6 text-center">
                ✧ Available Essences ✧
            </h2>
            <div className="overflow-y-auto h-[calc(100vh-100px)] scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent">
                {mockEssences.map((essence) => (
                    <SidebarItem
                        key={essence.id}
                        item={essence}
                        onClick={handleItemClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;