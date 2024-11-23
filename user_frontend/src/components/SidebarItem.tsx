import { EssenceItem } from '../types';

interface SidebarItemProps {
    item: EssenceItem;
    onClick: (item: EssenceItem) => void;
}

const SidebarItem = ({ item, onClick }: SidebarItemProps) => {
    const rarityColors = {
        common: 'from-purple-700/40 to-purple-600/40',
        rare: 'from-indigo-700/40 to-indigo-600/40',
        legendary: 'from-amber-700/40 to-amber-600/40'
    };

    return (
        <div
            onClick={() => onClick(item)}
            className={`cursor-pointer p-4 rounded-lg mb-3 bg-gradient-to-r ${rarityColors[item.rarity]} 
        border border-purple-500/20 hover:scale-105 transition-all duration-300
        shadow-[0_0_10px_rgba(139,92,246,0.1)]`}
        >
            <div className="flex items-center space-x-3">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30"
                />
                <div>
                    <h3 className="text-purple-100 font-medium">{item.name}</h3>
                    <p className="text-purple-200/60 text-sm">{item.description}</p>
                </div>
            </div>
        </div>
    );
};

export default SidebarItem;
