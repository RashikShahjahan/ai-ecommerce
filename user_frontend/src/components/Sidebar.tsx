import { useState } from 'react';
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
    const [isExpanded, setIsExpanded] = useState(false);

    const handleItemClick = (item: EssenceItem) => {
        console.log('Selected essence:', item);
        // Handle item selection here
    };

    return (
        <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'w-80' : 'w-12'
            } h-screen bg-gray-900/50 backdrop-blur-sm border-r border-purple-500/20 relative`}>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute -right-4 top-6 bg-gray-900/50 border border-purple-500/20 
                    rounded-full p-2 hover:bg-gray-800/50 transition-all duration-300
                    shadow-[0_0_10px_rgba(139,92,246,0.1)]"
            >
                <span className="text-purple-300">
                    {isExpanded ? '◄' : '►'}
                </span>
            </button>

            <div className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'
                }`}>
                {isExpanded && (
                    <>
                        <h2 className="text-2xl font-serif text-purple-100 mb-6 mt-6 text-center">
                            ✧ Available Essences ✧
                        </h2>
                        <div className="overflow-y-auto h-[calc(100vh-100px)] scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent p-4">
                            {mockEssences.map((essence) => (
                                <SidebarItem
                                    key={essence.id}
                                    item={essence}
                                    onClick={handleItemClick}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;