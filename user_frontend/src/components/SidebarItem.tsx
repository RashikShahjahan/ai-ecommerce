import { EssenceItem } from '../types';
import { ShoppingCart } from 'lucide-react';

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

    const handleAddToCart = (e: React.MouseEvent, item: EssenceItem) => {
        e.stopPropagation(); // Prevent triggering the parent onClick
        console.log('Added to cart:', item);
    };

    return (
        <div
            onClick={() => onClick(item)}
            className={`cursor-pointer p-4 rounded-lg mb-3 bg-gradient-to-r ${rarityColors[item.rarity]} 
                border border-purple-500/20 hover:scale-105 transition-all duration-300
                shadow-[0_0_10px_rgba(139,92,246,0.1)]`}
        >
            <div className="flex items-center justify-between">
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
                <button
                    onClick={(e) => handleAddToCart(e, item)}
                    className="ml-2 p-2 bg-purple-500/20 hover:bg-purple-500/30 
                        rounded-full text-purple-100 border border-purple-500/20 
                        transition-all duration-300 hover:scale-110"
                >
                    <ShoppingCart size={18} className="text-purple-200" />
                </button>
            </div>
        </div>
    );
};

export default SidebarItem;
